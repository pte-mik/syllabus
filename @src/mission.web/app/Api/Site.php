<?php namespace Application\Mission\Web\Api;

use Andesite\Mission\Web\Responder\ApiJsonResponder;
use Application\Mission\Web\Service\CurrentSite;

/**
 * @middleware Application\Mission\Web\Middleware\EditorCheck
 */
class Site extends ApiJsonResponder{

	/**
	 * @accepts get
	 * @action  menu
	 */
	public function menu_get(){
		return CurrentSite::get()->structure;
	}

	/**
	 * @accepts post
	 * @action  menu
	 */
	public function menu_post(){
		$site = CurrentSite::get();
		$site->structure = $this->getJsonParamBag()->get('menu');
		$site->save();
	}

	/**
	 * @accepts    get
	 * @action     settings
	 * @middleware Application\Mission\Web\Middleware\OwnerCheck
	 */
	public function settings_get(){
		return CurrentSite::get();
	}

	/**
	 * @accepts    post
	 * @action     settings
	 * @middleware Application\Mission\Web\Middleware\OwnerCheck
	 */
	public function settings_post(){
		$settings = $this->getJsonParamBag()->get('settings');
		$site = CurrentSite::get();
		$site->title = $settings['title'];
		$site->guests = $settings['guests'];
		$site->editors = $settings['editors'];
		$site->footerBgColor = $settings['footerBgColor'];
		$site->footerContact = $settings['footerContact'];
		$site->footerText = $settings['footerText'];
		$site->menuBgColor = $settings['menuBgColor'];
		$site->menuColor = $settings['menuColor'];
		$site->menuSecondaryColor = $settings['menuSecondaryColor'];
		$site->start = $settings['start'];
		$site->status = $settings['status'];
		$site->titleColor = $settings['titleColor'];
		$site->save();
	}



}