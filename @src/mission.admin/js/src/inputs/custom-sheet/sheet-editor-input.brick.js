import AbstractInputBrick from "zengular-codex/admin/inputs/~abstract-input-brick";
import {Brick}            from "zengular";
import twig               from "./sheet-editor-input.twig";
import "./sheet-editor-input.scss";
import SheetEditor        from "./sheet-editor.brick";

@Brick.register('codex-input-sheet-editor', twig)
@Brick.registerSubBricksOnRender()
@Brick.renderOnConstruct(false)
export default class InputSheetEditor extends AbstractInputBrick {

	getValue() { return this._value.sheet;}
	setValue(value) {this._value = value;}
	setOptions(options) { return super.setOptions(options);}

	onRender() {
		this.$$('open-editor').listen('click', (event) => {
			SheetEditor.modalify(this._value, value => this._value.modules = value);
			event.preventDefault();
		});
	}
}

