import {Brick} from "zengular";
import twig       from "./markdown.twig";
import MarkDownIt from "markdown-it";
import "./markdown.scss";

@Brick.register('markdown', twig)
class MarkDown extends Brick {

	onInitialize() {
		this.content = this.root.innerHTML;
	}

	createViewModel() {
		return {
			content: (new MarkDownIt()).render(this.content)
		}
	}

	onRender() {
		this.root.classList.add('rendered');
	}

	refresh(content){
		this.content = content;
		this.render();
	}

}