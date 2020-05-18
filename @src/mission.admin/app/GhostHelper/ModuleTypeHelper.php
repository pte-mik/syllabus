<?php namespace Application\AdminCodex\GhostHelper;

use Andesite\Codex\Form\AdminDescriptor;
use Andesite\Codex\Form\DataProvider\GhostDataProvider;
use Andesite\Codex\Form\Field;
use Andesite\Codex\Interfaces\DataProviderInterface;

/**
 * @label-field id: 
 * @label-field name: 
 */
abstract class ModuleTypeHelper extends AdminDescriptor{


	/** @var Field */ protected $id;
	/** @var Field */ protected $name;

	public function __construct(){
		$this->id = new Field('id', 'id');
		$this->name = new Field('name', 'name');
	}

	protected function createDataProvider(): DataProviderInterface{
		return new GhostDataProvider(\Application\Ghost\ModuleType::class);
	}

}
