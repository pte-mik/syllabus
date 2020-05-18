<?php namespace Application\Mission\Web\Service;

use Andesite\Core\ServiceManager\Service;
use Andesite\Core\ServiceManager\SharedService;
use Application\Component\Constant\Permission\Role;
use Application\Ghost\Site;
use Application\Module\MikAuth\MikAuth;

class Access implements SharedService{

	use Service;

	/** @var \Application\Ghost\Site|null */
	private $site;

	/** @var \Application\Module\MikAuth\MikAuth|null */
	private $mikAuth;

	public function __construct(){
		$this->mikAuth = MikAuth::Module();
		$this->site = CurrentSite::get();
	}

	public function isAuthenticated(){
		return $this->mikAuth->getAuthSession()->isAuthenticated();
	}

	public function isOwner(){
		if (!$this->isAuthenticated()) return false;
		if ($this->mikAuth->getAuthSession()->getUser()->checkRole(Role::Admin)) return true;
		return $this->mikAuth->getAuthSession()->getUser()->login === trim(strtolower($this->site->owner));
	}

	public function isEditor(){
		if (!$this->isAuthenticated()) return false;
		if ($this->isOwner()) return true;

		$access = $this->parseAccess($this->site->editors);
		return in_array($this->mikAuth->getAuthSession()->getUser()->login, $access['users']);
	}

	public function hasAccess(){
		if ($this->site->status === Site::V_status_public) return true;
		if (!$this->isAuthenticated()) return false;
		if ($this->isEditor()) return true;
		if ($this->site->status === Site::V_status_hidden) return false;
		if (trim($this->site->guests) === '*') return true;
		$access = $this->parseAccess($this->site->guests);
		return in_array($this->mikAuth->getAuthSession()->getUser()->login, $access['users']);
	}

	protected function parseAccess($string){
		$access = [
			'groups' => [],
			'users'  => [],
		];
		$elements = array_map('trim', explode("\n", strtolower($string)));
		foreach ($elements as $element){
			if (substr($element, 0, 1) === '@'){
				$access['groups'][] = substr($element, 1);
			}else{
				$access['users'][] = $element;
			}
		}
		return $access;
	}

}