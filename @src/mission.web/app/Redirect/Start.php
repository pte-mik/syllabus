<?php namespace Application\Mission\Web\Redirect;

use Andesite\Mission\Web\Pipeline\Redirect;
use Application\Mission\Web\Service\CurrentSite;

class Start extends Redirect{

	protected function run(){
		$start = trim(CurrentSite::get()->start);
		if(substr($start, 0, 1) === '@'){
			$start = '/wiki/'.substr($start, 1);
		}
		$this->url = $start;
	}

}