import CustomElement from "phlex-custom-element";
import Modal from "phlex-modal";
import codex from "phlex-codex";
import twig from "./template.twig";
import css from "./template.@.less";
import "./sheet-editor/sheet-editor";

@CustomElement.register('px-input-custom-sheet', {twig, css})
@codex.InputDecorator
export default class extends CustomElement{

	data = null;

	get value(){ return this.data; }

	set value(data){ this.data = data; }

	render(){
		super.render();
		this.shadowRoot.querySelector('button').addEventListener('click', (event) => { this.openModal(); });
	}

	openModal(){
		let modal = new Modal(window.parent);
		let editor = document.createElement('sheet-editor');
		modal.title = 'Sheet Editor';
		modal.class = 'frameless';
		modal.body = editor;
		modal.width = '95%';
		modal.height = '95%';
		modal.onClose = () => {
			this.data = editor.value;
		};
		editor.options = this.options;
		editor.value = this.data;
		modal.show();
	}

}
