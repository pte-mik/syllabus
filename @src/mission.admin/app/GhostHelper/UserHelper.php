<?php namespace Application\AdminCodex\GhostHelper;

use Andesite\Codex\Form\AdminDescriptor;
use Andesite\Codex\Form\DataProvider\GhostDataProvider;
use Andesite\Codex\Form\Field;
use Andesite\Codex\Interfaces\DataProviderInterface;

/**
 * @label-field id: 
 * @label-field name: 
 * @label-field email: 
 * @label-field password: 
 * @label-field created: 
 * @label-field groups: 
 * @label-field groups.admin: 
 * @label-field groups.editor: 
 * @label-field status: 
 * @label-field status.active: 
 * @label-field status.inactive: 
 * @label-field eha: 
 * @label-attachment avatar: 
 */
abstract class UserHelper extends AdminDescriptor{


	/** @var Field */ protected $id;
	/** @var Field */ protected $name;
	/** @var Field */ protected $email;
	/** @var Field */ protected $password;
	/** @var Field */ protected $created;
	/** @var Field */ protected $groups;
	/** @var Field */ protected $status;
	/** @var Field */ protected $eha;
	/** @var Field */ protected $avatar;

	public function __construct(){
		$this->id = new Field('id', 'id');
		$this->name = new Field('name', 'name');
		$this->email = new Field('email', 'email');
		$this->password = new Field('password', 'password');
		$this->created = new Field('created', 'created');
		$this->groups = new Field('groups', 'groups', ['admin'=>'admin', 'editor'=>'editor']);
		$this->status = new Field('status', 'status', ['active'=>'active', 'inactive'=>'inactive']);
		$this->eha = new Field('eha', 'eha');
		$this->avatar = new Field('avatar', 'avatar');
	}

	protected function createDataProvider(): DataProviderInterface{
		return new GhostDataProvider(\Application\Ghost\User::class);
	}

}
