<?php namespace Application\Module;

use Andesite\Core\Boot\Andesite;
use Andesite\Core\Module\Module;
use Andesite\Core\ServiceManager\ServiceContainer;
use Andesite\Util\Dumper\Dumper;
use Andesite\Util\Dumper\DumpInterface;
use Andesite\Util\RemoteLog\RemoteLog;
use Andesite\Util\ErrorHandler\ErrorHandler;
use Andesite\Util\ErrorHandler\ExceptionHandlerInterface;
use Andesite\Util\ErrorHandler\FatalErrorHandlerInterface;
use Andesite\DBAccess\Connection\SqlLogInterface;
use Andesite\Util\RemoteLog\RemoteLogSender;
use Symfony\Component\HttpFoundation\Request;

class Debug extends Module{

	public static function run($config){
		if (Andesite::Service()->isDevMode()){
			$request = ServiceContainer::get(Request::class);
			$requestId = Andesite::Service()->getRequestId();
			$remoteLog = new RemoteLog(
				new RemoteLogSender(
					$config['remote-log-host'],
					$requestId,
					$request->getMethod(),
					$request->getHost(),
					$request->getPathInfo()
				)
			);
			ServiceContainer::value(ExceptionHandlerInterface::class, $remoteLog);
			ServiceContainer::value(FatalErrorHandlerInterface::class, $remoteLog);
			ServiceContainer::value(DumpInterface::class, $remoteLog);
			ServiceContainer::value(SqlLogInterface::class, $remoteLog);
			ErrorHandler::Service()->register();
		}
		Dumper::load();
	}

}