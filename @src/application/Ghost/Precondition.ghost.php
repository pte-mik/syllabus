<?php namespace Application\Ghost;

use Andesite\Attachment\AttachmentCategoryManager;
use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\DBAccess\Connection\Filter\Comparison;
use Andesite\DBAccess\Connection\Finder;
use Andesite\Ghost\Field;
use Andesite\Ghost\Ghost;
use Andesite\Ghost\Model;

/**
 * @method static GhostPreconditionFinder search(Filter $filter = null)
 * @property-read $id
 */
abstract class PreconditionGhost extends Ghost{

	/** @var Model */
	public static $model;
	const Table = "precondition";
	const ConnectionName = "default";

		public static function f_id(){return new Comparison('id');}
		public static function f_subjectId(){return new Comparison('subjectId');}
		public static function f_preconditionSubjectId(){return new Comparison('preconditionSubjectId');}



	const F_id = "id";
	const F_subjectId = "subjectId";
	const F_preconditionSubjectId = "preconditionSubjectId";



	/** @var int $id */
	protected $id;
	/** @var int $subjectId */
	public $subjectId;
	/** @var int $preconditionSubjectId */
	public $preconditionSubjectId;



	final static protected function createModel(): Model{
		$model = new Model(get_called_class());
		$model->addField("id", Field::TYPE_ID,null);
		$model->addField("subjectId", Field::TYPE_ID,null);
		$model->addField("preconditionSubjectId", Field::TYPE_ID,null);
		$model->protectField("id");
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("subjectId", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("subjectId", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("preconditionSubjectId", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("preconditionSubjectId", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		return $model;
	}
}

/**
 * Nobody uses this class, it exists only to help the code completion
 * @method \Application\Ghost\Precondition[] collect($limit = null, $offset = null)
 * @method \Application\Ghost\Precondition[] collectPage($pageSize, $page, &$count = 0)
 * @method \Application\Ghost\Precondition pick()
 */
abstract class GhostPreconditionFinder extends Finder {}