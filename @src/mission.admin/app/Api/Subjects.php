<?php namespace Application\AdminCodex\Api;

use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\Mission\Web\Responder\ApiJsonResponder;
use Application\Ghost\Subject;

class Subjects extends ApiJsonResponder{
	/** @on get */
	function get($id){
		$ids = explode(',',$id);
		$subjects = Subject::collect($ids);
		return array_map([$this, 'map'], $subjects);
	}

	/** @accepts get */
	function all(){
		return Subject::search()->asc(Subject::F_name_hu)->collect();
	}

	/** @accepts get */
	function search($name){
		$subjects = Subject::search(
			Filter::where(Subject::f_name_en()->instring($name))
				->or(Subject::f_name_hu()->instring($name))
				->or(Subject::f_code()->instring($name)
				))->collect();
		return array_map([$this, 'map'], $subjects);
	}

	function map(Subject $subject){
		if(is_null($subject)) return null;
		return [
			'key'   => $subject->id,
			'value' => $subject->name_hu. ' ('. $subject->code .')',
		];
	}
}