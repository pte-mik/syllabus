<?php namespace Application\AdminCodex\GhostHelper;

use Andesite\Codex\Form\AdminDescriptor;
use Andesite\Codex\Form\DataProvider\GhostDataProvider;
use Andesite\Codex\Form\Field;
use Andesite\Codex\Interfaces\DataProviderInterface;

/**
 * @label-field id: 
 * @label-field name_hu: megnevezés (hu)
 * @label-field name_en: megnevezés (en)
 * @label-field responsibleId: felelős
 */
abstract class SkillHelper extends AdminDescriptor{


	/** @var Field */ protected $id;
	/** @var Field */ protected $name_hu;
	/** @var Field */ protected $name_en;
	/** @var Field */ protected $responsibleId;

	public function __construct(){
		$this->id = new Field('id', 'id');
		$this->name_hu = new Field('name_hu', 'megnevezés (hu)');
		$this->name_en = new Field('name_en', 'megnevezés (en)');
		$this->responsibleId = new Field('responsibleId', 'felelős');
	}

	protected function createDataProvider(): DataProviderInterface{
		return new GhostDataProvider(\Application\Ghost\Skill::class);
	}

}
