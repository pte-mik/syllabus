<?php namespace Application\Ghost;

use Andesite\Attachment\AttachmentCategoryManager;
use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\DBAccess\Connection\Filter\Comparison;
use Andesite\DBAccess\Connection\Finder;
use Andesite\Ghost\Field;
use Andesite\Ghost\Ghost;
use Andesite\Ghost\Model;

/**
 * @method static GhostCurriculumFinder search(Filter $filter = null)
 * @property-read $id
 */
abstract class CurriculumGhost extends Ghost{

	/** @var Model */
	public static $model;
	const Table = "curriculum";
	const ConnectionName = "default";

		public static function f_id(){return new Comparison('id');}
		public static function f_name(){return new Comparison('name');}
		public static function f_semesters(){return new Comparison('semesters');}
		public static function f_sheet(){return new Comparison('sheet');}
		public static function f_level(){return new Comparison('level');}

	const V_level_msc = "msc";
	const V_level_bsc = "bsc";
	const V_level_foksz = "foksz";

	const F_id = "id";
	const F_name = "name";
	const F_semesters = "semesters";
	const F_sheet = "sheet";
	const F_level = "level";



	/** @var int $id */
	protected $id;
	/** @var string $name */
	public $name;
	/** @var int $semesters */
	public $semesters;
	/** @var array $sheet */
	public $sheet;
	/** @var string $level */
	public $level;



	final static protected function createModel(): Model{
		$model = new Model(get_called_class());
		$model->addField("id", Field::TYPE_ID,null);
		$model->addField("name", Field::TYPE_STRING,null);
		$model->addField("semesters", Field::TYPE_INT,null);
		$model->addField("sheet", Field::TYPE_JSON,null);
		$model->addField("level", Field::TYPE_ENUM,['msc','bsc','foksz']);
		$model->protectField("id");
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("name", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name", new \Symfony\Component\Validator\Constraints\Length(['max'=>255]));
		$model->addValidator("semesters", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("level", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("level", new \Symfony\Component\Validator\Constraints\Choice(['msc','bsc','foksz']));
		return $model;
	}
}

/**
 * Nobody uses this class, it exists only to help the code completion
 * @method \Application\Ghost\Curriculum[] collect($limit = null, $offset = null)
 * @method \Application\Ghost\Curriculum[] collectPage($pageSize, $page, &$count = 0)
 * @method \Application\Ghost\Curriculum pick()
 */
abstract class GhostCurriculumFinder extends Finder {}