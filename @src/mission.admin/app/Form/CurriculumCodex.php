<?php namespace Application\AdminCodex\Form;

use Andesite\Codex\Form\FormDecorator;
use Andesite\Codex\Form\FormHandler\FormHandler;
use Andesite\Codex\Form\ListHandler\ListHandler;
use Application\AdminCodex\GhostHelper\CurriculumHelper;
use Application\AdminCodex\GhostHelper\ModuleTypeHelper;
use Application\AdminCodex\GhostHelper\SkillHelper;
use Application\Component\Constant\Permission\Role;

class CurriculumCodex extends CurriculumHelper{

	protected function decorator(FormDecorator $decorator){
		$decorator->setIcons('fal fa-book');
		$decorator->setTitle('Tantervek');
		$decorator->setRole(Role::Admin);
	}

	protected function listHandler(ListHandler $list){
		$list->addJSPlugin('ListButtonAddNew');
		$list->add($this->id)->visible(false);
		$list->add($this->name);
		$list->add($this->semesters);
	}

	protected function formHandler(FormHandler $form){
		$form->setLabelField($this->name);
		$form->addJSPlugin('FormButtonSave', 'FormButtonDelete', 'FormButtonReload');

		$main = $form->section('Adatok');
		$main->input('string', $this->name);
		$main->input('integer', $this->semesters);
		$main->input('sheet-editor', $this->sheet);
	}


}
