<?php namespace Application\Mission\Web\Api;

use Andesite\Mission\Web\Action\NotFound;
use Andesite\Mission\Web\Responder\ApiJsonResponder;
use Application\Ghost\Blogpost;
use Application\Mission\Web\Service\CurrentSite;

/**
 * @middleware Application\Mission\Web\Middleware\EditorCheck
 */
class Blog extends ApiJsonResponder{

	/** @on get */
	public function get($id = null){
		if (is_null($id)){
			$posts = CurrentSite::get()->getBlogposts();
			return ["blogposts" => $posts];
		}else{
			return ['blogpost' => $this->pickPost($id)];
		}
	}

	/** @on delete */
	public function delete($id){
		$post = $this->pickPost($id);
		$post->status = Blogpost::V_status_deleted;
		$post->save();
	}

	/** @on post */
	public function save($id = null){
		if (is_null($id)){
			$blogpost = new Blogpost();
			$blogpost->title = 'New Page';
			$blogpost->lead = "";
			$blogpost->content = "";
			$blogpost->status = Blogpost::V_status_draft;
			$blogpost->siteId = CurrentSite::get()->id;
			$blogpost->published = new \DateTime();
			$blogpost->save();
			return ["id" => $blogpost->id];
		}else{
			$blogpost = $this->pickPost($id);
			$blogpost->title =  $this->getJsonParamBag()->get('title');
			$blogpost->lead = $this->getJsonParamBag()->get('lead');
			$blogpost->content = $this->getJsonParamBag()->get('content');
			$blogpost->published = new \DateTime($this->getJsonParamBag()->get('published'));
			$blogpost->save();
		}
	}

	/** @accepts post */
	public function activate($id){
		$post = $this->pickPost($id);
		$post->status = Blogpost::V_status_active;
		$post->save();
	}

	/** @accepts post */
	public function deactivate($id){
		$post = $this->pickPost($id);
		$post->status = Blogpost::V_status_draft;
		$post->save();
	}

	protected function pickPost($id): Blogpost{
		$post = Blogpost::pick($id);
		if (is_null($post) || CurrentSite::get()->id !== $post->siteId) $this->break(NotFound::class);
		return $post;
	}
}