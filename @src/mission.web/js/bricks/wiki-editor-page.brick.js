import {Brick}              from "zengular";
import twig                 from "./wiki-editor-page.twig";
import "./wiki-editor-page.scss";
import {modalify}            from "zengular-ui";
import DataService          from "../service/data-service";

@modalify()
@Brick.register('wiki-editor-page', twig)
@Brick.renderOnConstruct(false)
export default class PageEditor extends Brick {

	beforeRender(args) {
		this.id = args;
		return DataService.getWikiPage(this.id).then(page=>this.page = page);

	}

	createViewModel() {
		return{page:this.page};

	}

	onRender() {
		this.$$('editor').listen('input', () => this.$$('display').node.controller.refresh(this.$$('editor').node.value));
	}

	getContent(){
		return {
			id: this.id,
			title: this.$$('title').node.value,
			slug: this.$$('slug').node.value,
			content: this.$$('editor').node.value
		}
	}

	isContentChanged(){
		let data = this.getContent();
		return data.content !== this.page.content || data.title !== this.page.title || data.slug !== this.page.slug;
	}
}