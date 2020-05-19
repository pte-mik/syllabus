<?php namespace Application\AdminCodex\GhostHelper;

use Andesite\Codex\Form\AdminDescriptor;
use Andesite\Codex\Form\DataProvider\GhostDataProvider;
use Andesite\Codex\Form\Field;
use Andesite\Codex\Interfaces\DataProviderInterface;

/**
 * @label-field id: 
 * @label-field name: 
 * @label-field name_hu: 
 * @label-field name_en: 
 */
abstract class ModuleTypeHelper extends AdminDescriptor{


	/** @var Field */ protected $id;
	/** @var Field */ protected $name;
	/** @var Field */ protected $name_hu;
	/** @var Field */ protected $name_en;

	public function __construct(){
		$this->id = new Field('id', 'id');
		$this->name = new Field('name', 'name');
		$this->name_hu = new Field('name_hu', 'name_hu');
		$this->name_en = new Field('name_en', 'name_en');
	}

	protected function createDataProvider(): DataProviderInterface{
		return new GhostDataProvider(\Application\Ghost\ModuleType::class);
	}

}
