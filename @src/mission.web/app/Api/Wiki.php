<?php namespace Application\Mission\Web\Api;

use Andesite\Mission\Web\Action\NotFound;
use Andesite\Mission\Web\Responder\ApiJsonResponder;
use Application\Ghost\Page;
use Application\Mission\Web\Service\CurrentSite;

/**
 * @middleware Application\Mission\Web\Middleware\EditorCheck
 */
class Wiki extends ApiJsonResponder{

	/** @on get */
	public function get($id = null){
		if (is_null($id)){
			$pages = CurrentSite::get()->getPages();
			return ["pages" => $pages];
		}else{
			return ['page' => $this->pickPage($id)];
		}
	}

	/** @on delete */
	public function delete($id){
		$page = $this->pickPage($id);
		$page->status = Page::V_status_deleted;
		$page->save();
	}

	/** @on post */
	public function save($id = null){
		if (is_null($id)){
			$page = new Page();
			$page->title = 'New Page';
			$page->slug = "new-page";
			$page->content = "";
			$page->status = Page::V_status_draft;
			$page->siteId = CurrentSite::get()->id;
			$page->save();
			return ["id" => $page->id];
		}else{
			$page = $this->pickPage($id);
			$page->title = $this->getJsonParamBag()->get('title');
			$page->slug = $this->getJsonParamBag()->get('slug');
			$page->content = $this->getJsonParamBag()->get('content');
			$page->save();
		}
	}

	/** @accepts post */
	public function activate($id){
		$page = $this->pickPage($id);
		$page->status = Page::V_status_active;
		$page->save();
	}

	/** @accepts post */
	public function deactivate($id){
		$page = $this->pickPage($id);
		$page->status = Page::V_status_draft;
		$page->save();
	}

	protected function pickPage($id): Page{
		$page = Page::pick($id);
		if (is_null($page) || CurrentSite::get()->id !== $page->siteId) $this->break(NotFound::class);
		return $page;
	}
}