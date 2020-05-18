import {Brick}           from "zengular";
import twig              from "./settings-editor-modal.twig";
import "./settings-editor-modal.scss";
import {modalify}        from "zengular-ui";
import DataService       from "../service/data-service";
import confirmModalClose from "../misc/confirm-modal-close";

import "./attachment-input.brick";

@modalify()
@confirmModalClose()
@Brick.register('settings-editor', twig)
export default class SettingsEditor extends Brick {

	beforeRender(args) {
	}

	onInitialize() {}

	createViewModel() {
		return DataService.getSettings().then(settings => {
			this.settings = settings;
			return {settings}
		});
	}

	onRender() {
		this.$$('close').listen('click', () => this.closeConfirm());
		this.$$('save').listen('click', () => this.save());
	}

	isContentChanged() {
		let settings = this.collectData();
		for(let prop in settings) if(settings.hasOwnProperty(prop)){
			if(settings[prop] !== this.settings[prop]) return true;
		}
		return false;
	}

	save() {
		let settings = this.collectData();
		DataService.saveSettings(settings).then(xhr => document.location.reload());
	}

	collectData(){
		let data = {};
		this.$('input,select,textarea').each(input=>{
			data[input.getAttribute('name')] = input.value;
		});
		return data;
	}

}