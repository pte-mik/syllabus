<?php namespace Application\Mission\Web\Service;

use Andesite\Core\ServiceManager\Service;
use Andesite\Core\ServiceManager\SharedService;
use Application\Ghost\Site;
use Symfony\Component\HttpFoundation\Request;

class CurrentSite implements SharedService{
	use Service;

	/** @var \Symfony\Component\HttpFoundation\Request */
	private $request;

	/** @var \Application\Ghost\Site */
	private $site;

	public function __construct(Request $request){
		$this->request = $request;
	}

	static function get(): ?Site{
		return static::Service()->getSite();
	}

	protected function getSite(){
		if (!$this->site){
			$domainparts = explode('.', $this->request->getHost());
			$slug = array_shift($domainparts);
			$this->site = Site::pickBySlug($slug);
		}
		return $this->site;
	}
}