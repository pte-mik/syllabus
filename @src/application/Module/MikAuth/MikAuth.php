<?php namespace Application\Module\MikAuth;

use Andesite\Core\Module\Module;
use Andesite\Mission\Web\Pipeline\Redirect;
use Andesite\Mission\Web\Routing\Router;

class MikAuth extends Module{

	private $config;
	private $params = [];


	protected function fetch($url){
		return file_get_contents($url, false, stream_context_create([
			'ssl'  => [
				'verify_peer'      => false,
				'verify_peer_name' => false,
			]
		]));
	}

	public function setup($config){
		$this->config = $config;
	}

	/**
	 * @return \Application\Module\MikAuth\AuthSession
	 */
	public function getAuthSession(){
		return AuthSession::Service();
	}

	public function getSuccessPage(){ return $this->config['success-page']; }
	public function getAfterLogoutPage(){ return $this->config['after-logout-page']; }
	public function getLoginPage(){ return $this->config['login-page']; }

	public function route(Router $router){
		$router->get($this->config['login-page'], Redirect::class, ['url' => $this->config['login'] . '/' . $this->config['app'] .(count($this->params) ? '?'.http_build_query($this->params) : '')])();
		$router->get($this->config['logout-page'], Logout::class)();
		$router->get($this->config['success-callback'] . "/{token}", Auth::class)();
	}

	public function setParam($key, $value){
		$this->params[$key] = $value;
	}

	/**
	 * @param $token
	 * @return \Application\Module\MikAuth\MikUser|null
	 */
	public function fetchUser($token){
		$data = json_decode($this->fetch($this->config['login'] . '/api/auth/fetch/' . $token), true);
		return $data ? new MikUser($data) : null;
	}

	/**
	 * @param $keyword
	 * @return \Application\Module\MikAuth\MikUser[]
	 */
	public function search($keyword){
		return array_map(function ($data){ return new MikUser($data); }, json_decode($this->fetch($this->config['login'] . '/api/user/search/' . $keyword), true));
	}

	/**
	 * @param $id
	 * @return \Application\Module\MikAuth\MikUser|null
	 */
	public function pick($id){
		$data = json_decode($this->fetch($this->config['login'] . '/api/user/' . $id), true);
		return $data ? new MikUser($data) : null;
	}

	/**
	 * @param mixed ...$ids
	 * @return \Application\Module\MikAuth\MikUser[]
	 */
	public function collect(...$ids){
		return array_map(function ($data){ return new MikUser($data); }, json_decode($this->fetch($this->config['login'] . '/api/user/collect/' . join(',', $ids)),true));
	}

	/**
	 * @param $userId
	 * @return mixed
	 */
	public function getUserPermissions($userId){
		return json_decode($this->fetch($this->config['login'] . '/api/user/permissions/' . $this->config['app'].'/'.$userId), true);
	}

	/**
	 * @return mixed
	 */
	public function getAppPermissions(){
		return json_decode($this->fetch($this->config['login'] . '/api/permissions/' . $this->config['app']), true);
	}

	/**
	 * @param mixed ...$ids
	 * @return \Application\Module\MikAuth\MikUser
	 */
	public function login($login, $password){
		try{
			$result = $this->fetch($this->config['login'] . '/api/auth/login/?app='.$this->config['app'].'&login='.$login.'&password='.$password);
		}catch (\Throwable $exception){
			return null;
		}
		$data = json_decode($result, true);		return $data ? new MikUser(json_decode($result, true)) : null;
	}
}
