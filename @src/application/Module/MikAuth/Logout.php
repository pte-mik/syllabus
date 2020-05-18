<?php namespace Application\Module\MikAuth;

use Andesite\Mission\Web\Responder\PageResponder;

class Logout extends PageResponder{

	protected function respond(){
		MikAuth::Module()->getAuthSession()->forget();
		$this->redirect(MikAuth::Module()->getAfterLogoutPage());
	}

}