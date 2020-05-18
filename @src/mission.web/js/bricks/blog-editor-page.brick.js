import {Brick}       from "zengular";
import twig          from "./blog-editor-page.twig";
import "./blog-editor-page.scss";
import {modalify}    from "zengular-ui";
import DataService   from "../service/data-service";
import datetimeLocal from "zengular-util/src/datetime-local";

@modalify()
@Brick.register('blog-editor-page', twig)
@Brick.renderOnConstruct(false)
export default class PageEditor extends Brick {

	beforeRender(args) {
		this.id = args;
		return DataService.getBlogPost(this.id).then(post=>{
			post.published = datetimeLocal(post.published, true, true);
			this.post = post;
		});

	}

	createViewModel() {
		return{
			post:{
				id: this.post.id,
				title: this.post.title,
				lead: this.post.lead,
				content: this.post.content,
				published: datetimeLocal(this.post.published, true),
			}
		};

	}

	onRender() {
		this.$$('editor').listen('input', () => this.$$('display').node.controller.refresh(this.$$('editor').node.value));
	}

	getContent(){
		return {
			id: this.id,
			title: this.$$('title').node.value,
			lead: this.$$('lead-editor').node.value,
			published: datetimeLocal(this.$$('published').node.value, true, true),
			content: this.$$('editor').node.value
		}
	}

	isContentChanged(){
		let data = this.getContent();
		console.log(data.published, this.post.published)
		return data.content !== this.post.content || data.title !== this.post.title || data.lead !== this.post.lead || data.published !== this.post.published;
	}
}