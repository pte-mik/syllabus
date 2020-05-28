<?php namespace Application\AdminCodex\Form;

use Andesite\Codex\Form\FormDecorator;
use Andesite\Codex\Form\FormHandler\FormHandler;
use Andesite\Codex\Form\ListHandler\ListHandler;
use Application\AdminCodex\GhostHelper\ModuleTypeHelper;
use Application\AdminCodex\GhostHelper\SkillHelper;
use Application\Component\Constant\Permission\Role;

class ModuleTypeCodex extends ModuleTypeHelper{

	protected function decorator(FormDecorator $decorator){
		$decorator->setIcons('fal fa-book');
		$decorator->setTitle('Modultípus');
		$decorator->setRole(Role::Admin);
	}

	protected function listHandler(ListHandler $list){
		$list->addJSPlugin('ListButtonAddNew');
		$list->add($this->id)->visible(false);
		$list->add($this->name);
	}

	protected function formHandler(FormHandler $form){
		$form->setLabelField($this->name);
		$form->addJSPlugin('FormButtonSave', 'FormButtonDelete', 'FormButtonReload');


		$main = $form->section('Adatok');
		$main->input('string', $this->name);
		$main->input('string', $this->name_hu);
		$main->input('string', $this->name_en);
	}


}
