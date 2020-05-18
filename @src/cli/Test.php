<?php namespace Application\CliCommand;

use Andesite\Mission\Cli\CliCommand;
use Andesite\Mission\Cli\CliModule;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

class Test extends CliModule{

	protected function createCommand($config): Command{
		return new class( $config, 'app:test' ) extends CliCommand{
			protected function runCommand(SymfonyStyle $style, InputInterface $input, OutputInterface $output, $config){
				$style->success('Done');
			}
		};
	}

}