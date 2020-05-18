<?php namespace Application\AdminCodex\GhostHelper;

use Andesite\Codex\Form\AdminDescriptor;
use Andesite\Codex\Form\DataProvider\GhostDataProvider;
use Andesite\Codex\Form\Field;
use Andesite\Codex\Interfaces\DataProviderInterface;

/**
 * @label-field id: 
 * @label-field programmeId: 
 * @label-field language: 
 * @label-field language.hu: 
 * @label-field language.en: 
 * @label-field name: 
 * @label-field semesters: 
 * @label-field accepted: 
 * @label-field sheet: 
 */
abstract class CurriculumHelper extends AdminDescriptor{


	/** @var Field */ protected $id;
	/** @var Field */ protected $programmeId;
	/** @var Field */ protected $language;
	/** @var Field */ protected $name;
	/** @var Field */ protected $semesters;
	/** @var Field */ protected $accepted;
	/** @var Field */ protected $sheet;

	public function __construct(){
		$this->id = new Field('id', 'id');
		$this->programmeId = new Field('programmeId', 'programmeId');
		$this->language = new Field('language', 'language', ['hu'=>'hu', 'en'=>'en']);
		$this->name = new Field('name', 'name');
		$this->semesters = new Field('semesters', 'semesters');
		$this->accepted = new Field('accepted', 'accepted');
		$this->sheet = new Field('sheet', 'sheet');
	}

	protected function createDataProvider(): DataProviderInterface{
		return new GhostDataProvider(\Application\Ghost\Curriculum::class);
	}

}
