<?php namespace Application\AdminCodex\GhostHelper;

use Andesite\Codex\Form\AdminDescriptor;
use Andesite\Codex\Form\DataProvider\GhostDataProvider;
use Andesite\Codex\Form\Field;
use Andesite\Codex\Interfaces\DataProviderInterface;

/**
 * @label-field id: 
 * @label-field name: 
 * @label-field semesters: 
 * @label-field sheet: 
 * @label-field level: 
 * @label-field level.msc: 
 * @label-field level.bsc: 
 * @label-field level.foksz: 
 */
abstract class CurriculumHelper extends AdminDescriptor{


	/** @var Field */ protected $id;
	/** @var Field */ protected $name;
	/** @var Field */ protected $semesters;
	/** @var Field */ protected $sheet;
	/** @var Field */ protected $level;

	public function __construct(){
		$this->id = new Field('id', 'id');
		$this->name = new Field('name', 'name');
		$this->semesters = new Field('semesters', 'semesters');
		$this->sheet = new Field('sheet', 'sheet');
		$this->level = new Field('level', 'level', ['msc'=>'msc', 'bsc'=>'bsc', 'foksz'=>'foksz']);
	}

	protected function createDataProvider(): DataProviderInterface{
		return new GhostDataProvider(\Application\Ghost\Curriculum::class);
	}

}
