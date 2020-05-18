<?php namespace Application\Mission\Web\Page;

use Andesite\TwigResponder\Responder\SmartPageResponder;
use Application\Module\MikAuth\MikAuth;

/**
 * @template "index.twig"
 * @title ""
 * @bodyclass ""
 * @js "/~web/app.js"
 * @css "/~web/app.css"
 */
class Index extends SmartPageResponder
{
	protected function prepare(){
		dump(MikAuth::Module()->getAuthSession()->getUser()->getPermissions());
	}
}