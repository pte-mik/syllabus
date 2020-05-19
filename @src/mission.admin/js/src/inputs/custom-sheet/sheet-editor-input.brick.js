import AbstractInputBrick from "zengular-codex/admin/inputs/~abstract-input-brick";
import {Brick}            from "zengular";
import twig               from "./sheet-editor-input.twig";
import "./sheet-editor-input.scss";
import SheetEditor        from "./sheet-editor.brick";

@Brick.register('codex-input-sheet-editor', twig)
@Brick.registerSubBricksOnRender()
@Brick.renderOnConstruct(false)
export default class InputSheetEditor extends AbstractInputBrick {

	getValue() { this._value;}
	setValue(value) { this._value = value;}
	setOptions(options) { return super.setOptions(options);}

	onRender() {
		this.$$('open-editor').listen('click', (event) => {
			SheetEditor.modalify(this._value);
			event.preventDefault();
		});
	}
}

//import CustomElement from "phlex-custom-element";
//import Modal from "phlex-modal";
//import codex from "phlex-codex";
//import twig from "./template.twig";
//import css from "./template.@.less";
//import "./sheet-editor/sheet-editor";
//
//@CustomElement.register('px-input-custom-sheet', {twig, css})
//@codex.InputDecorator
//export default class extends CustomElement{
//
//	data = null;
//
//	get value(){ return this.data; }
//
//	set value(data){ this.data = data; }
//
//	render(){
//		super.render();
//		this.shadowRoot.querySelector('button').addEventListener('click', (event) => { this.openModal(); });
//	}
//
//	openModal(){
//		let modal = new Modal(window.parent);
//		let editor = document.createElement('sheet-editor');
//		modal.title = 'Sheet Editor';
//		modal.class = 'frameless';
//		modal.body = editor;
//		modal.width = '95%';
//		modal.height = '95%';
//		modal.onClose = () => {
//			this.data = editor.value;
//		};
//		editor.options = this.options;
//		editor.value = this.data;
//		modal.show();
//	}
//
//}
