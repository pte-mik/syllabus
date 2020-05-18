<?php namespace Application\Module\MikAuth;

use Andesite\Mission\Web\Pipeline\Middleware;

class AuthenticationMiddleware extends Middleware{

	public function run(){
		if(MikAuth::Module()->getAuthSession()->isAuthenticated()){
			$this->next();
		}else{
			$this->redirect(MikAuth::Module()->getLoginPage());
		}
	}
}