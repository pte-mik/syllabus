<?php namespace Application\AdminCodex\Api;

use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\Mission\Web\Responder\ApiJsonResponder;
use Application\Ghost\ModuleType;
use Application\Ghost\Skill;
use Application\Ghost\Subject;

class Skills extends ApiJsonResponder{
	/** @on get */
	function get($id){
		$ids = explode(',',$id);
		$items = Skill::collect($ids);
		return array_map([$this, 'map'], $items);
	}

	/** @accepts get */
	function all(){
		return Skill::search()->asc(Skill::F_name_hu)->collect();
	}

	/** @accepts get */
	function search($name){
		$items = Skill::search(
			Filter::where(Skill::f_name_en()->instring($name))
				->or(Skill::f_name_hu()->instring($name))
				)->collect();
		return array_map([$this, 'map'], $items);
	}

	function map(Skill $item){
		if(is_null($item)) return null;
		return [
			'key'   => $item->id,
			'value' => $item->name,
		];
	}
}