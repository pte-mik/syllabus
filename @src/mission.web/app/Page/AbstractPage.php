<?php namespace Application\Mission\Web\Page;

use Andesite\TwigResponder\Responder\SmartPageResponder;
use Application\Mission\Web\Service\Access;
use Application\Mission\Web\Service\CurrentSite;
use Application\Module\MikAuth\MikAuth;
/**
 * @template "@web/Blog.twig"
 * @js "/~web/app.js"
 * @css "/~web/app.css"
 */
abstract class AbstractPage extends SmartPageResponder {

	/** @var \Application\Module\MikAuth\MikAuth  */
	protected $mikAuth;
	/** @var \Application\Ghost\Site|null  */
	protected $site;
	/** @var \Application\Mission\Web\Service\Access */
	protected Access $access;

	public function __construct(){
		parent::__construct();
		$this->mikAuth = MikAuth::Module();
		$this->site = CurrentSite::get();
		$this->access = Access::Service();
	}


	protected function prepare(){
		$this->title = $this->site->title;
		$this->set('user', $this->mikAuth->getAuthSession()->getUser());
		$this->set('access', $this->access);
		$this->set('site', $this->site);
		$this->set('menu', $this->site->structure['items']);
	}

}