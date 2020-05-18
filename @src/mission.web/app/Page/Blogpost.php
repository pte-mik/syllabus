<?php namespace Application\Mission\Web\Page;

use Application\Mission\Web\Service\CurrentSite;

/**
 * @template "blogpost.twig"
 * @title "Index"
 * @bodyclass "mypage"
 * @js "/~web/app.js"
 * @css "/~web/app.css"
 */
class Blogpost extends AbstractPage{


	protected function prepare(){
		parent::prepare();

		$id = $this->getPathBag()->get('id');
		$post = $this->site->getBlogpost($id);
		if ($post){
			$this->title = $post->title;
		}
		$this->set('post', $post);
	}

}