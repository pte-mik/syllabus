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
		public static function f_name_hu(){return new Comparison('name_hu');}
		public static function f_name_en(){return new Comparison('name_en');}



	const F_id = "id";
	const F_name = "name";
	const F_name_hu = "name_hu";
	const F_name_en = "name_en";



	/** @var int $id */
	protected $id;
	/** @var string $name */
	public $name;
	/** @var string $name_hu */
	public $name_hu;
	/** @var string $name_en */
	public $name_en;



	final static protected function createModel(): Model{
		$model = new Model(get_called_class());
		$model->addField("id", Field::TYPE_ID,null);
		$model->addField("name", Field::TYPE_STRING,null);
		$model->addField("name_hu", Field::TYPE_STRING,null);
		$model->addField("name_en", Field::TYPE_STRING,null);
		$model->protectField("id");
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("name", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name", new \Symfony\Component\Validator\Constraints\Length(['max'=>255]));
		$model->addValidator("name_hu", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name_hu", new \Symfony\Component\Validator\Constraints\Length(['max'=>512]));
		$model->addValidator("name_en", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name_en", new \Symfony\Component\Validator\Constraints\Length(['max'=>512]));
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