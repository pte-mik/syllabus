<?php namespace Application\Mission\Web\Middleware;

use Andesite\Mission\Web\Action\NotAuthorized;
use Andesite\Mission\Web\Pipeline\Middleware;
use Application\Mission\Web\Service\Access;
use Application\Module\MikAuth\MikAuth;

class AccessCheck extends Middleware{

	public function run(){

		$access = Access::Service();

		if($access->hasAccess()){
			$this->next();
		}else{
			$this->redirect(MikAuth::Module()->getLoginPage());
		}
	}
}