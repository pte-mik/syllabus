<?php namespace Application\Mission\Web\Page;

/**
 * @template "blog.twig"
 * @js "/~web/app.js"
 * @css "/~web/app.css"
 */
class Blog extends AbstractPage{

	protected function prepare(){
		parent::prepare();

		$pagesize = 20;
		$pagelister = 11;

		$page = $this->getPathBag()->get('page', 1);

		$this->set('blogposts', $this->site->getPublicBlogposts($page, $pagesize, $count));

		$pagecount = ceil($count / $pagesize);

		if ($pagecount < $pagelister){
			$first = 1;
			$last = $pagecount + 1;
		}else{
			$first = $page - ( $pagelister - 1 ) / 2;
			if ($first < 1) $first = 1;
			$last = $first + $pagelister;
			if ($last > $pagecount){
				$last = $pagecount + 1;
				$first = $last - $pagelister;
			}
		}
		$pages = [];
		for ($i = $first; $i < $last; $i++) $pages[] = $i;
		$this->set('pagecount', $pagecount);
		$this->set('page', $page);
		$this->set('pages', $pages);

	}

}