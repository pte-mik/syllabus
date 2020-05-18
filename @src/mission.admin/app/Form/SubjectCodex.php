<?php namespace Application\AdminCodex\Form;

use Andesite\Codex\Form\Field;
use Andesite\Codex\Form\FormDecorator;
use Andesite\Codex\Form\FormHandler\FormHandler;
use Andesite\Codex\Form\ListHandler\ListHandler;
use Andesite\Codex\Interfaces\DataProviderInterface;
use Application\AdminCodex\GhostHelper\SkillHelper;
use Application\AdminCodex\GhostHelper\SubjectHelper;
use Application\Component\Constant\Permission\Role;
use Application\Ghost\Precondition;
use Application\Ghost\Skill;
use Application\Ghost\Subject;

class SubjectCodex extends SubjectHelper{

	protected function decorator(FormDecorator $decorator){
		$decorator->setIcons('fal fa-book');
		$decorator->setTitle('Tantárgy');
		$decorator->setRole(Role::Admin);
	}

	protected function createDataProvider(): DataProviderInterface{

		$dataProvider = parent::createDataProvider();
		$dataProvider->addFieldConverter('preconditions', function (Subject $item){ return Precondition::getPreconditionIds($item->id); });
		return $dataProvider;
	}

	protected function listHandler(ListHandler $list){
		$list->addJSPlugin('ListButtonAddNew');
		$list->add($this->id)->visible(false);
		$list->add($this->name_hu);
		$list->add($this->name_en);
	}

	protected function formHandler(FormHandler $form){
		$form->setLabelField($this->name_hu);
		$form->addJSPlugin('FormButtonSave', 'FormButtonDelete', 'FormButtonReload');

		$form->setOnSave(function ($id, $data){
			Precondition::set($id, $data['preconditions']);
		});

		$skills = Skill::search()->asc('name_hu')->collect();
		$skillOptions = [];
		foreach ($skills as $skill) $skillOptions[$skill->id] = $skill->name_hu;

		$main = $form->section('Adatok');
		$main->input('string', $this->name_en);
		$main->input('string', $this->name_hu);
		$main->input('string', $this->code);
		$main->input('select', $this->skillId)('options', $skillOptions);
		$main->input('select', $this->status)('options', $this->status->options);
		$main->input('combobox', $this->responsibleId)('url','/api/users/');
		$main->input('combobox', new Field('preconditions', 'előfeltételek'))('url','/api/subjects/')('multi', true);

		$main = $form->section('Adatok');
		$main->input('integer', $this->credits);
		$main->input('integer', $this->lectures);
		$main->input('integer', $this->labPractices);
		$main->input('integer', $this->practices);
		$main->input('integer', $this->internship);
		$main->input('select', $this->examType)('options', $this->examType->options);

		$main = $form->section('Tárgyleírás');
		$main->input('text', $this->description_hu);
		$main->input('text', $this->description_en);
	}


}
