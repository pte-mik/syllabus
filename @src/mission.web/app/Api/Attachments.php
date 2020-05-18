<?php namespace Application\Mission\Web\Api;

use Andesite\Ghost\Ghost;
use Andesite\Mission\Web\Action\NotAuthorized;
use Andesite\Mission\Web\Action\NotFound;
use Andesite\Mission\Web\Responder\ApiJsonResponder;
use Application\Ghost\Blogpost;
use Application\Ghost\Page;
use Application\Mission\Web\Service\Access;
use Application\Mission\Web\Service\CurrentSite;

/**
 * @middleware Application\Mission\Web\Middleware\EditorCheck
 */
class Attachments extends ApiJsonResponder{

	/** @on get */
	public function get($content, $id, $category){
		$item = $this->item($content, $id);
		return ['attachments' => $item->getAttachmentCategoryManager($category)->getAttachments()];
	}

	/** @on delete */
	public function delete($content, $id, $category, $file){
		$item = $this->item($content, $id);
		$item->getAttachmentCategoryManager($category)->get($file)->remove();
	}

	/** @on post */
	public function post($content, $id, $category){
		$item = $this->item($content, $id);
		$file = $this->getFileBag()->get('file');
		try{
			$item->getAttachmentCategoryManager($category)->addFile($file);
		}catch (\Exception $e){
			$this->getResponse()->setStatusCode(400);
		}
	}

	private function item($content, $id): Ghost{
		switch ($content){
			case 'site':
				if (!Access::Service()->isOwner()) $this->break(NotAuthorized::class);
				return CurrentSite::get();
				break;
			case 'blog':
				$item = Blogpost::pick($id);
				if ($item->siteId !== CurrentSite::get()->id) $this->break(NotFound::class);
				break;
			case 'wiki':
				$item = Page::pick($id);
				if ($item->siteId !== CurrentSite::get()->id) $this->break(NotFound::class);
				break;
			default:
				$this->break(NotFound::class);
		}
		if (is_null($item)) $this->break(NotFound::class);
		return $item;
	}

}