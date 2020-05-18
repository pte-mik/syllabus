<?php namespace Application\Ghost;

use Andesite\Attachment\AttachmentCategoryManager;
use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\DBAccess\Connection\Filter\Comparison;
use Andesite\DBAccess\Connection\Finder;
use Andesite\Ghost\Field;
use Andesite\Ghost\Ghost;
use Andesite\Ghost\Model;

/**
 * @method static GhostModuleTypeFinder search(Filter $filter = null)
 * @property-read $id
 */
abstract class ModuleTypeGhost extends Ghost{

	/** @var Model */
	public static $model;
	const Table = "module_type";
	const ConnectionName = "default";

		public static function f_id(){return new Comparison('id');}
		public static function f_name(){return new Comparison('name');}



	const F_id = "id";
	const F_name = "name";



	/** @var int $id */
	protected $id;
	/** @var string $name */
	public $name;



	final static protected function createModel(): Model{
		$model = new Model(get_called_class());
		$model->addField("id", Field::TYPE_ID,null);
		$model->addField("name", Field::TYPE_STRING,null);
		$model->protectField("id");
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("name", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name", new \Symfony\Component\Validator\Constraints\Length(['max'=>255]));
		return $model;
	}
}

/**
 * Nobody uses this class, it exists only to help the code completion
 * @method \Application\Ghost\ModuleType[] collect($limit = null, $offset = null)
 * @method \Application\Ghost\ModuleType[] collectPage($pageSize, $page, &$count = 0)
 * @method \Application\Ghost\ModuleType pick()
 */
abstract class GhostModuleTypeFinder extends Finder {}