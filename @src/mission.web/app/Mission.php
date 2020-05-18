<?php namespace Application\Mission\Web;

use Andesite\Ghost\GhostManager;
use Andesite\Mission\Web\Routing\Router;
use Andesite\Mission\Web\WebMission;
use Application\Ghost\Site;
use Application\Mission\Web\Middleware\AccessCheck;
use Application\Mission\Web\Redirect\Start;
use Application\Mission\Web\Service\CurrentSite;
use Application\Module\MikAuth\AuthenticationMiddleware;
use Application\Module\MikAuth\MikAuth;

class Mission extends WebMission{

	public function route(Router $router){


		$site = CurrentSite::get();
		MikAuth::Module()->setParam('site', $site->slug);
		MikAuth::Module()->route($router);

		$router->pipe(AccessCheck::class);

		$router->api('/api', __NAMESPACE__.'\\Api')();
		GhostManager::Module()->routeThumbnail($router);
		$router->get('/wiki/{slug}', Page\Wiki::class)();
		$router->get('/blog', Page\Blog::class)();
		$router->get('/blog/{page}', Page\Blog::class)();
		$router->get('/blog-post/{id}', Page\BlogPost::class)();
		$router->get('/*', Start::class)();
	}
}
