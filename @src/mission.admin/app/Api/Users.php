<?php

namespace Application\AdminCodex\Api;

use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\Mission\Web\Responder\ApiJsonResponder;
use Application\Module\MikAuth\MikAuth;
use Application\Module\MikAuth\MikUser;

class Users extends ApiJsonResponder{
	/**
	 * @on get
	 */
	function get($id){
		dump($id);
		$ids = explode(',', $id);
		$users = MikAuth::Module()->collect(...$ids);
		return array_map([$this, 'map'], $users);
	}
	/**
	 * @accepts get
	 */
	function search($name){
		$users = MikAuth::Module()->search($name);
		return array_map([$this, 'map'], $users);
	}

	function map(MikUser $user){
		if (is_null($user)) return null;
		return ['key' => $user->id, 'value' => $user->name];
	}
}