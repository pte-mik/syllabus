<?php namespace Application\CliCommand;

use Andesite\Mission\Cli\CliCommand;
use Andesite\Mission\Cli\CliModule;
use Application\Ghost\User;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Question\Question;
use Symfony\Component\Console\Style\SymfonyStyle;

class CreateAdminUser extends CliModule{

	protected function createCommand($config): Command{
		return new class( $config, 'app:create-admin-user' ) extends CliCommand{
			protected function runCommand(SymfonyStyle $style, InputInterface $input, OutputInterface $output, $config){
				$helper = $this->getHelper('question');

				$name = $helper->ask($input, $output, new Question('name: '));
				$email = $helper->ask($input, $output, new Question('email: '));
				$password = $helper->ask($input, $output, new Question('password: '));

				$user = new User();
				$user->name = $name;
				$user->email = $email;
				$user->password = $password;
				$user->groups = [User::V_groups_admin];
				$user->save();

				$style->success('Done (user id:'.$user->id.')');
			}
		};
	}

}