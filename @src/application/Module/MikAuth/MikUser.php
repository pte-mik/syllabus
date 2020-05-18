<?php namespace Application\Module\MikAuth;

use Andesite\Zuul\RoleManager\RoleManager;
class MikUser{

	public $id;
	public $login;
	public $name;
	public $avatar;
	public $avatar128;
	public $avatar64;
	public $avatar32;
	public $displayNameEn;
	public $displayNameHu;
	public $neptun;

	private $permissions = null;

	public function __construct($data){
		$this->id = $data['id'];
		$this->login = $data['login'] ?: '';
		$this->name = $data['name'] ?: '';
		$this->avatar = $data['avatar'] ?: '';
		$this->avatar128 = $data['avatar128'] ?: '';
		$this->avatar64 = $data['avatar64'] ?: '';
		$this->avatar32 = $data['avatar32'] ?: '';
		$this->displayNameEn = $data['displayNameEn'] ?: '';
		$this->displayNameHu = $data['displayNameHu'] ?: '';
		$this->neptun = $data['neptun'] ?: '';
	}

	public function checkRole($role = null): bool{
		return ( is_null($role) || array_key_exists($role, RoleManager::Module()->resolveGroups($this->getPermissions())) );
	}

	public function hasPermission($permission){
		return in_array($permission, $this->getPermissions());
	}

	public function getPermissions(){
		if ($this->permissions === null){
			$this->permissions = MikAuth::Module()->getUserPermissions($this->id);
		}
		return $this->permissions;
	}

}