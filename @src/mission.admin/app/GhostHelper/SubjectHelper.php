<?php namespace Application\AdminCodex\GhostHelper;

use Andesite\Codex\Form\AdminDescriptor;
use Andesite\Codex\Form\DataProvider\GhostDataProvider;
use Andesite\Codex\Form\Field;
use Andesite\Codex\Interfaces\DataProviderInterface;

/**
 * @label-field id: 
 * @label-field name_hu: megnevezés (hu)
 * @label-field name_en: megnevezés (en)
 * @label-field credits: kreditek
 * @label-field code: kód
 * @label-field lectures: előadás
 * @label-field labPractices: labor
 * @label-field practices: gyakorlat
 * @label-field internship: szakmai gyakorlat
 * @label-field examType: vizsga típus
 * @label-field examType.exam: vizsga
 * @label-field examType.midterm: félévközi jegy
 * @label-field examType.sign: aláírás
 * @label-field level: szint
 * @label-field level.msc: MSc
 * @label-field level.bsc: BSc
 * @label-field level.foksz: FOKSZ
 * @label-field skillId: Ismeretkör
 * @label-field status: Státusz
 * @label-field status.draft: vázlat
 * @label-field status.live: aktív
 * @label-field status.deleted: törölt
 * @label-field responsibleId: felelős
 * @label-field description_en: leírás (en)
 * @label-field description_hu: leírás (hu)
 */
abstract class SubjectHelper extends AdminDescriptor{


	/** @var Field */ protected $id;
	/** @var Field */ protected $name_hu;
	/** @var Field */ protected $name_en;
	/** @var Field */ protected $credits;
	/** @var Field */ protected $code;
	/** @var Field */ protected $lectures;
	/** @var Field */ protected $labPractices;
	/** @var Field */ protected $practices;
	/** @var Field */ protected $internship;
	/** @var Field */ protected $examType;
	/** @var Field */ protected $level;
	/** @var Field */ protected $skillId;
	/** @var Field */ protected $status;
	/** @var Field */ protected $responsibleId;
	/** @var Field */ protected $description_en;
	/** @var Field */ protected $description_hu;

	public function __construct(){
		$this->id = new Field('id', 'id');
		$this->name_hu = new Field('name_hu', 'megnevezés (hu)');
		$this->name_en = new Field('name_en', 'megnevezés (en)');
		$this->credits = new Field('credits', 'kreditek');
		$this->code = new Field('code', 'kód');
		$this->lectures = new Field('lectures', 'előadás');
		$this->labPractices = new Field('labPractices', 'labor');
		$this->practices = new Field('practices', 'gyakorlat');
		$this->internship = new Field('internship', 'szakmai gyakorlat');
		$this->examType = new Field('examType', 'vizsga típus', ['exam'=>'vizsga', 'midterm'=>'félévközi jegy', 'sign'=>'aláírás']);
		$this->level = new Field('level', 'szint', ['msc'=>'MSc', 'bsc'=>'BSc', 'foksz'=>'FOKSZ']);
		$this->skillId = new Field('skillId', 'Ismeretkör');
		$this->status = new Field('status', 'Státusz', ['draft'=>'vázlat', 'live'=>'aktív', 'deleted'=>'törölt']);
		$this->responsibleId = new Field('responsibleId', 'felelős');
		$this->description_en = new Field('description_en', 'leírás (en)');
		$this->description_hu = new Field('description_hu', 'leírás (hu)');
	}

	protected function createDataProvider(): DataProviderInterface{
		return new GhostDataProvider(\Application\Ghost\Subject::class);
	}

}
