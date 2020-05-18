<?php namespace Application\Module\MikAuth;

use Andesite\Mission\Web\Responder\PageResponder;

class Auth extends PageResponder{

	protected function respond(){
		$user = MikAuth::Module()->fetchUser($this->getPathBag()->get('token'));
		if(!is_null($user)){
			AuthSession::Service()->setUser($user);
		}
		$this->redirect(MikAuth::Module()->getSuccessPage());
	}

}