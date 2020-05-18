<?php namespace Application\Service\Auth;

use Andesite\Core\ServiceManager\Service;
use Andesite\Core\ServiceManager\SharedService;
use Application\Ghost\User;
use Andesite\Codex\Interfaces\CodexWhoAmIInterface;
use Andesite\Zuul\Auth\WhoAmI;

class CodexWhoAmI extends WhoAmI implements CodexWhoAmIInterface, SharedService{

	use Service;

	public function getName(): string{return User::pick($this())->name;}
	public function getAvatar(): string{
		$user = User::pick($this());
		return (User::$model->getAttachmentStorage()->hasCategory('avatar') && $user->avatar->count) ? $user->avatar->first->thumbnail->crop(64, 64)->png : '';
	}
}