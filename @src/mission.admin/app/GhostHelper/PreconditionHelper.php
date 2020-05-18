<?php namespace Application\AdminCodex\GhostHelper;

use Andesite\Codex\Form\AdminDescriptor;
use Andesite\Codex\Form\DataProvider\GhostDataProvider;
use Andesite\Codex\Form\Field;
use Andesite\Codex\Interfaces\DataProviderInterface;

/**
 * @label-field id: 
 * @label-field subjectId: 
 * @label-field preconditionSubjectId: 
 */
abstract class PreconditionHelper extends AdminDescriptor{


	/** @var Field */ protected $id;
	/** @var Field */ protected $subjectId;
	/** @var Field */ protected $preconditionSubjectId;

	public function __construct(){
		$this->id = new Field('id', 'id');
		$this->subjectId = new Field('subjectId', 'subjectId');
		$this->preconditionSubjectId = new Field('preconditionSubjectId', 'preconditionSubjectId');
	}

	protected function createDataProvider(): DataProviderInterface{
		return new GhostDataProvider(\Application\Ghost\Precondition::class);
	}

}
