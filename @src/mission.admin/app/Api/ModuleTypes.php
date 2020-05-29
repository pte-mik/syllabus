<?php namespace Application\AdminCodex\Api;

use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\Mission\Web\Responder\ApiJsonResponder;
use Application\Ghost\ModuleType;
use Application\Ghost\Subject;

class  ModuleTypes extends ApiJsonResponder{
	/** @on get */
	function get($id){
		$ids = explode(',',$id);
		$items = ModuleType::collect($ids);
		return array_map([$this, 'map'], $items);
	}

	/** @accepts get */
	function all(){
		return ModuleType::search()->asc(ModuleType::F_name)->collect();
	}

	/** @accepts get */
	function search($name){
		$items = ModuleType::search(
			Filter::where(ModuleType::f_name_en()->instring($name))
				->or(ModuleType::f_name_hu()->instring($name))
				->or(ModuleType::f_name()->instring($name)
				))->collect();
		return array_map([$this, 'map'], $items);
	}

	function map(ModuleType $item){
		if(is_null($item)) return null;
		return [
			'key'   => $item->id,
			'value' => $item->name,
		];
	}
}