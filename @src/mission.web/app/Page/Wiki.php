<?php namespace Application\Mission\Web\Page;

use Application\Mission\Web\Service\CurrentSite;
/**
 * @template "wiki.twig"
 * @title "Index"
 * @bodyclass "mypage"
 * @js "/~web/app.js"
 * @css "/~web/app.css"
 */
class Wiki extends AbstractPage{

	protected $site;
	protected function prepare(){
		parent::prepare();

		$this->site = CurrentSite::get();

		$slug = $this->getPathBag()->get('slug');
		$page = $this->site->getPage($slug);
		if ($page){
			$this->title = $page->title;
		}
		$this->set('page', $page);
	}

}