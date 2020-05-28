<?php namespace Application\AdminCodex;

use Andesite\Codex\CodexMission;
use Andesite\Codex\Form\CodexMenu;
use Andesite\Codex\Interfaces\CodexWhoAmIInterface;
use Andesite\Core\ServiceManager\ServiceContainer;
use Andesite\Mission\Web\Routing\ApiManager;
use Andesite\Mission\Web\Routing\Router;
use Andesite\Zuul\Interfaces\AuthServiceInterface;
use Application\Module\MikAuth\AuthService;
use Application\Module\MikAuth\CodexWhoAmI;

class Mission extends CodexMission{

	protected function menu(CodexMenu $menu){
		$menu->addCodexItem(Form\SkillCodex::class);
		$menu->addCodexItem(Form\SubjectCodex::class);
		$menu->addCodexItem(Form\ModuleTypeCodex::class);
		$menu->addCodexItem(Form\CurriculumCodex::class);
	}

	public function route(Router $router){
		parent::route($router);
		$router->api('/api', __NAMESPACE__.'\\Api');
	}

	public function setup($config){
		parent::setup($config);
		ServiceContainer::shared(AuthServiceInterface::class, AuthService::class);
		ServiceContainer::shared(CodexWhoAmIInterface::class, CodexWhoAmI::class);
	}

}