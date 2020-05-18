<?php namespace Application\Module\MikAuth;

use Andesite\Codex\Interfaces\CodexWhoAmIInterface;
use Andesite\Core\ServiceManager\Service;
use Application\Module\MikAuth\MikAuth;
class CodexWhoAmI implements CodexWhoAmIInterface{

	use Service;

	public function getName(): string{
		return MikAuth::Module()->getAuthSession()->getUser()->name;
	}

	public function getAvatar(): string{
		return MikAuth::Module()->getAuthSession()->getUser()->avatar32;
	}

	public function checkRole($role): bool{
		return MikAuth::Module()->getAuthSession()->getUser()->checkRole($role);
	}

	public function isAuthenticated(): bool{
		return MikAuth::Module()->getAuthSession()->isAuthenticated();
	}

	public function logout(){
		return MikAuth::Module()->getAuthSession()->forget();
	}

	public function __invoke(): ?int{
		return MikAuth::Module()->getAuthSession()->getUserId();
	}
}