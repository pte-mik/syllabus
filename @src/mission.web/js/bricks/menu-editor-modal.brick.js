import {Brick}           from "zengular";
import twig              from "./menu-editor-modal.twig";
import "./menu-editor-modal.scss";
import {modalify}        from "zengular-ui";
import DataService       from "../service/data-service";
import confirmModalClose from "../misc/confirm-modal-close";

@modalify()
@confirmModalClose()
@Brick.register('menu-editor', twig)
export default class MenuEditor extends Brick {

	beforeRender(args) {
	}

	onInitialize() {}

	createViewModel() {
		return DataService.getMenu().then(menu => {
			this.menu = menu;
			this.openState = JSON.stringify(menu);
			return {menu}
		});
	}

	onRender() {
		this.$$('close').listen('click', () => this.closeConfirm());
		this.$$('save').listen('click', () => this.save());
	}

	isContentChanged() {
		return this.openState !== JSON.stringify(this.$$('editor').brick.getValue());
	}

	save(close = false) {
		let menu = this.$$('editor').brick.getValue();
		DataService.saveMenu(menu).then(xhr => document.location.reload());
	}

}