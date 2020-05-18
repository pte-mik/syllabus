<?php namespace Application\Module\MikAuth;

use Andesite\Core\ServiceManager\Service;
class AuthSession extends \Andesite\Zuul\Auth\AuthSession{

	use Service;

	private ?MikUser $user = null;

	public function setUser(MikUser $user){
		$this->user = $user;
		$this->setUserId($user->id);
	}

	/**
	 * @return \Application\Module\MikAuth\MikUser|null
	 */
	public function getUser(){
		if(is_null($this->getUserId())) return null;
		if(is_null($this->user)){
			$this->user = MikAuth::Module()->pick($this->getUserId());
		}
		return $this->user;
	}

	public function isAuthenticated(){
		return boolval($this->userId);
	}

}