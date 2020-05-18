<?php namespace Application\Ghost;

use Andesite\Attachment\AttachmentCategoryManager;
use Andesite\DBAccess\Connection\Filter\Filter;
use Andesite\DBAccess\Connection\Filter\Comparison;
use Andesite\DBAccess\Connection\Finder;
use Andesite\Ghost\Field;
use Andesite\Ghost\Ghost;
use Andesite\Ghost\Model;

/**
 * @method static GhostSubjectFinder search(Filter $filter = null)
 * @property-read $id
 */
abstract class SubjectGhost extends Ghost{

	/** @var Model */
	public static $model;
	const Table = "subject";
	const ConnectionName = "default";

		public static function f_id(){return new Comparison('id');}
		public static function f_name_hu(){return new Comparison('name_hu');}
		public static function f_name_en(){return new Comparison('name_en');}
		public static function f_description_hu(){return new Comparison('description_hu');}
		public static function f_description_en(){return new Comparison('description_en');}
		public static function f_credits(){return new Comparison('credits');}
		public static function f_code(){return new Comparison('code');}
		public static function f_mandatory(){return new Comparison('mandatory');}
		public static function f_lectures(){return new Comparison('lectures');}
		public static function f_labPractices(){return new Comparison('labPractices');}
		public static function f_practices(){return new Comparison('practices');}
		public static function f_internship(){return new Comparison('internship');}
		public static function f_examType(){return new Comparison('examType');}
		public static function f_level(){return new Comparison('level');}
		public static function f_skillId(){return new Comparison('skillId');}
		public static function f_status(){return new Comparison('status');}
		public static function f_responsibleId(){return new Comparison('responsibleId');}

	const V_examType_exam = "exam";
	const V_examType_midterm = "midterm";
	const V_examType_sign = "sign";
	const V_level_msc = "msc";
	const V_level_bsc = "bsc";
	const V_level_foksz = "foksz";
	const V_status_draft = "draft";
	const V_status_live = "live";
	const V_status_deleted = "deleted";

	const F_id = "id";
	const F_name_hu = "name_hu";
	const F_name_en = "name_en";
	const F_description_hu = "description_hu";
	const F_description_en = "description_en";
	const F_credits = "credits";
	const F_code = "code";
	const F_mandatory = "mandatory";
	const F_lectures = "lectures";
	const F_labPractices = "labPractices";
	const F_practices = "practices";
	const F_internship = "internship";
	const F_examType = "examType";
	const F_level = "level";
	const F_skillId = "skillId";
	const F_status = "status";
	const F_responsibleId = "responsibleId";



	/** @var int $id */
	protected $id;
	/** @var string $name_hu */
	public $name_hu;
	/** @var string $name_en */
	public $name_en;
	/** @var string $description_hu */
	public $description_hu;
	/** @var string $description_en */
	public $description_en;
	/** @var int $credits */
	public $credits;
	/** @var string $code */
	public $code;
	/** @var int $mandatory */
	public $mandatory;
	/** @var int $lectures */
	public $lectures;
	/** @var int $labPractices */
	public $labPractices;
	/** @var int $practices */
	public $practices;
	/** @var int $internship */
	public $internship;
	/** @var string $examType */
	public $examType;
	/** @var string $level */
	public $level;
	/** @var int $skillId */
	public $skillId;
	/** @var string $status */
	public $status;
	/** @var int $responsibleId */
	public $responsibleId;



	final static protected function createModel(): Model{
		$model = new Model(get_called_class());
		$model->addField("id", Field::TYPE_ID,null);
		$model->addField("name_hu", Field::TYPE_STRING,null);
		$model->addField("name_en", Field::TYPE_STRING,null);
		$model->addField("description_hu", Field::TYPE_STRING,null);
		$model->addField("description_en", Field::TYPE_STRING,null);
		$model->addField("credits", Field::TYPE_INT,null);
		$model->addField("code", Field::TYPE_STRING,null);
		$model->addField("mandatory", Field::TYPE_INT,null);
		$model->addField("lectures", Field::TYPE_INT,null);
		$model->addField("labPractices", Field::TYPE_INT,null);
		$model->addField("practices", Field::TYPE_INT,null);
		$model->addField("internship", Field::TYPE_INT,null);
		$model->addField("examType", Field::TYPE_ENUM,['exam','midterm','sign']);
		$model->addField("level", Field::TYPE_ENUM,['msc','bsc','foksz']);
		$model->addField("skillId", Field::TYPE_ID,null);
		$model->addField("status", Field::TYPE_ENUM,['draft','live','deleted']);
		$model->addField("responsibleId", Field::TYPE_ID,null);
		$model->protectField("id");
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("id", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("name_hu", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name_hu", new \Symfony\Component\Validator\Constraints\Length(['max'=>255]));
		$model->addValidator("name_en", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("name_en", new \Symfony\Component\Validator\Constraints\Length(['max'=>255]));
		$model->addValidator("description_hu", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("description_hu", new \Symfony\Component\Validator\Constraints\Length(['max'=>65535]));
		$model->addValidator("description_en", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("description_en", new \Symfony\Component\Validator\Constraints\Length(['max'=>65535]));
		$model->addValidator("credits", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("credits", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("code", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("code", new \Symfony\Component\Validator\Constraints\Length(['max'=>255]));
		$model->addValidator("mandatory", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("mandatory", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("lectures", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("lectures", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("labPractices", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("labPractices", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("practices", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("practices", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("internship", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("internship", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("examType", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("examType", new \Symfony\Component\Validator\Constraints\Choice(['exam','midterm','sign']));
		$model->addValidator("level", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("level", new \Symfony\Component\Validator\Constraints\Choice(['msc','bsc','foksz']));
		$model->addValidator("skillId", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("skillId", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		$model->addValidator("status", new \Symfony\Component\Validator\Constraints\Type('string'));
		$model->addValidator("status", new \Symfony\Component\Validator\Constraints\Choice(['draft','live','deleted']));
		$model->addValidator("responsibleId", new \Symfony\Component\Validator\Constraints\Type('int'));
		$model->addValidator("responsibleId", new \Symfony\Component\Validator\Constraints\PositiveOrZero());
		return $model;
	}
}

/**
 * Nobody uses this class, it exists only to help the code completion
 * @method \Application\Ghost\Subject[] collect($limit = null, $offset = null)
 * @method \Application\Ghost\Subject[] collectPage($pageSize, $page, &$count = 0)
 * @method \Application\Ghost\Subject pick()
 */
abstract class GhostSubjectFinder extends Finder {}