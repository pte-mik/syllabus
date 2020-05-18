<?php namespace Application\Service\Auth;

use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\Zuul\Interfaces\AuthenticableInterface;
use Andesite\Zuul\Interfaces\AuthRepositoryInterface;
use Application\Component\Constant\Permission\Role;
use Application\Ghost\User;

class AuthRepository implements AuthRepositoryInterface{
	public function authLookup($id): ?AuthenticableInterface{
		$user = $user = User::pick($id);
		if(is_null($user)) return null;
		return $user->checkRole(Role::Active) ? $user : null;
	}
	public function authLoginLookup($login): ?AuthenticableInterface{
		$user = User::search(Filter::where(User::F_email . '=$1', $login))->pick();
		if(is_null($user)) return null;
		return $user->checkRole(Role::Active) ? $user : null;

	}
}