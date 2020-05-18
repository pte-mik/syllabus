import {Brick}     from "zengular";
import twig        from "./blog-editor-list.twig";
import "./blog-editor-list.scss";
import DataService from "../service/data-service";
import Confirm     from "./confirm-modal.brick";

@Brick.register('blog-editor-list', twig)
export default class BlogEditor extends Brick {

	beforeRender(args) {
	}

	onInitialize() {}

	createViewModel() {
		return DataService.getBlogPosts().then(posts => {
			return {posts}
		});
	}

	onRender() {
		this.$$('delete').listen('click',(e,t)=>{
			Confirm.modalify(true, result=>{
				if(result) DataService.deleteBlogPost(t.dataset.id).then(()=>this.render());
			});
		});
		this.$$('activate').listen('click',(e,t)=>DataService.activateBlogPost(t.dataset.id).then(()=>this.render()));
		this.$$('deactivate').listen('click',(e,t)=>DataService.deactivateBlogPost(t.dataset.id).then(()=>this.render()));
		this.$$('edit').listen('click',(e,t)=>this.fire('PAGE-SELECTED', t.dataset.id));
	}

}