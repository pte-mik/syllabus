<?php ( function ($classLoader){
	Andesite\Core\Boot\Andesite::setup(__DIR__ . "/..", "etc/ini/env", "var/env.php", $classLoader);
} )(include __DIR__ . '/../vendor/autoload.php');