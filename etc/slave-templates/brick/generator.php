<?php return new class(){

	public function __invoke(Symfony\Component\Console\Style\SymfonyStyle $style, \Twig\Environment $twig){
		$name = $style->ask('name');
		$tag = $style->ask('tag', $name);
		$location = $style->ask('location (relative to project root)', "@src/mission.web/js/bricks");
		$location = \Andesite\Core\Env\Env::Service()->get('root')."/".$location;
		$data = compact('name', 'tag');

		$templates = glob('*.twig');

		foreach ($templates as $template){
			$file = $location."/".$twig->createTemplate(substr($template, 0, -5))->render($data);
			$content = $twig->createTemplate(file_get_contents($template))->render($data);
			file_put_contents($file, $content);
			$style->success('done.');
		}
	}

};