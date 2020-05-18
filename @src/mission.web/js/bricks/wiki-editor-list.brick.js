import {Brick}     from "zengular";
import twig        from "./wiki-editor-list.twig";
import "./wiki-editor-list.scss";
import DataService from "../service/data-service";
import Confirm     from "./confirm-modal.brick";

@Brick.register('wiki-editor-list', twig)
export default class WikiEditor extends Brick {

	beforeRender(args) {
	}

	onInitialize() {}

	createViewModel() {
		return DataService.getWikiPages().then(pages => {
			return {pages}
		});
	}

	onRender() {
		this.$$('delete').listen('click',(e,t)=>{
			Confirm.modalify(true, result=>{
				if(result) DataService.deleteWikiPage(t.dataset.id).then(()=>this.render());
			});
		});
		this.$$('activate').listen('click',(e,t)=>DataService.activateWikiPage(t.dataset.id).then(()=>this.render()));
		this.$$('deactivate').listen('click',(e,t)=>DataService.deactivateWikiPage(t.dataset.id).then(()=>this.render()));
		this.$$('edit').listen('click',(e,t)=>this.fire('PAGE-SELECTED', t.dataset.id));
	}

}