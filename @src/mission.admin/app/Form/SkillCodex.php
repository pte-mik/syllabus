<?php namespace Application\AdminCodex\Form;

use Andesite\Codex\Form\FormDecorator;
use Andesite\Codex\Form\FormHandler\FormHandler;
use Andesite\Codex\Form\ListHandler\ListHandler;
use Application\AdminCodex\GhostHelper\SkillHelper;
use Application\Component\Constant\Permission\Role;

class SkillCodex extends SkillHelper{

	protected function decorator(FormDecorator $decorator){
		$decorator->setIcons('fal fa-book');
		$decorator->setTitle('Ismeretkör');
		$decorator->setRole(Role::Admin);
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


		$main = $form->section('Adatok');
		$main->input('string', $this->name_en);
		$main->input('string', $this->name_hu);
		$main->input('combobox', $this->responsibleId)('url','/api/users/');
	}


}
