<?php namespace Application\Module\MikAuth;

use Andesite\Zuul\Interfaces\AuthenticableInterface;
use Andesite\Zuul\Interfaces\AuthServiceInterface;

class AuthService implements AuthServiceInterface{

	protected $session;

	public function __construct(AuthSession $session){
		$this->session = $session;
	}

	public function login($login, $password, $role = null): bool{
		$user = MikAuth::Module()->login($login, $password);
		if (!$user) return false;
		if (!is_null($role) && !$user->checkRole($role) ) return false;
		$this->session->setUser($user);
		return true;
	}

	public function logout(){ $this->clearAuthSession(); }

	public function isAuthenticated(): bool{
		return $this->session->isAuthenticated();
	}

	public function getAuthenticatedId(): int{ return $this->session->getUserId(); }

	public function checkRole($role): bool{
		return $this->session->getUser()->checkRole($role);
	}

	public function registerAuthSession(AuthenticableInterface $user){ }

	protected function clearAuthSession(){ $this->session->forget(); }

}