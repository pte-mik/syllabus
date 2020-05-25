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
		public static function f_programmeId(){return new Comparison('programmeId');}
		public static function f_language(){return new Comparison('language');}
		public static function f_name(){return new Comparison('name');}
		public static function f_semesters(){return new Comparison('semesters');}
		public static function f_accepted(){return new Comparison('accepted');}
		public static function f_sheet(){return new Comparison('sheet');}

	const V_language_hu = "hu";
	const V_language_en = "en";

	const F_id = "id";
	const F_programmeId = "programmeId";
	const F_language = "language";
	const F_name = "name";
	const F_semesters = "semesters";
	const F_accepted = "accepted";
	const F_sheet = "sheet";



	/** @var int $id */
	protected $id;
	/** @var int $programmeId */
	public $programmeId;
	/** @var string $language */
	public $language;
	/** @var string $name */
	public $name;
	/** @var int $semesters */
	public $semesters;
	/** @var \Valentine\Date $accepted */
	public $accepted;
	/** @var array $sheet */
	public $sheet;



	final static protected function createModel(): Model{
		$model = new Model(get_called_class());
		$model->addField("id", Field::TYPE_ID,null);
		$model->addField("programmeId", Field::TYPE_INT,null);
		$model->addField("language", Field::TYPE_ENUM,['hu','en']);
		$model->addField("name", Field::TYPE_STRING,null);
		$model->addField("semesters", Field::TYPE_INT,null);
		$model->addField("accepted", Field::TYPE_DATE,null);
		$model->addField("sheet", Field::TYPE_JSON,null);
		$model->protectField("id");
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("programmeId", new \Symfony\Component\Validator\Constraints\NotNull());
		$model->addValidator("programmeId", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("language", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("language", new \Symfony\Component\Validator\Constraints\Choice(['hu','en']));
		$model->addValidator("name", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name", new \Symfony\Component\Validator\Constraints\Length(['max'=>255]));
		$model->addValidator("semesters", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("accepted", new \Andesite\Ghost\Validator\Instance('Valentine\\Date'));
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