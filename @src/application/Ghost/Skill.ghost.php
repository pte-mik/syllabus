<?php namespace Application\Ghost;

use Andesite\Attachment\AttachmentCategoryManager;
use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\DBAccess\Connection\Filter\Comparison;
use Andesite\DBAccess\Connection\Finder;
use Andesite\Ghost\Field;
use Andesite\Ghost\Ghost;
use Andesite\Ghost\Model;

/**
 * @method static GhostSkillFinder search(Filter $filter = null)
 * @property-read $id
 */
abstract class SkillGhost extends Ghost{

	/** @var Model */
	public static $model;
	const Table = "skill";
	const ConnectionName = "default";

		public static function f_id(){return new Comparison('id');}
		public static function f_name_hu(){return new Comparison('name_hu');}
		public static function f_name_en(){return new Comparison('name_en');}
		public static function f_responsibleId(){return new Comparison('responsibleId');}



	const F_id = "id";
	const F_name_hu = "name_hu";
	const F_name_en = "name_en";
	const F_responsibleId = "responsibleId";



	/** @var int $id */
	protected $id;
	/** @var string $name_hu */
	public $name_hu;
	/** @var string $name_en */
	public $name_en;
	/** @var int $responsibleId */
	public $responsibleId;



	final static protected function createModel(): Model{
		$model = new Model(get_called_class());
		$model->addField("id", Field::TYPE_ID,null);
		$model->addField("name_hu", Field::TYPE_STRING,null);
		$model->addField("name_en", Field::TYPE_STRING,null);
		$model->addField("responsibleId", Field::TYPE_ID,null);
		$model->protectField("id");
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("name_hu", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name_hu", new \Symfony\Component\Validator\Constraints\Length(['max'=>255]));
		$model->addValidator("name_en", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name_en", new \Symfony\Component\Validator\Constraints\Length(['max'=>255]));
		$model->addValidator("responsibleId", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("responsibleId", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		return $model;
	}
}

/**
 * Nobody uses this class, it exists only to help the code completion
 * @method \Application\Ghost\Skill[] collect($limit = null, $offset = null)
 * @method \Application\Ghost\Skill[] collectPage($pageSize, $page, &$count = 0)
 * @method \Application\Ghost\Skill pick()
 */
abstract class GhostSkillFinder extends Finder {}