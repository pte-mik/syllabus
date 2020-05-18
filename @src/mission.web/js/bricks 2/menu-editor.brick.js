import {Brick} from "zengular";
import twig    from "./menu-editor.twig";
import "./menu-editor.scss";

@Brick.register('menu-editor', twig)
export default class MenuEditor extends Brick {

	onInitialize() {
		try {
			this.value = JSON.parse(this.root.innerHTML);
		} catch (e) {
			this.value = [];
		}
		this.dragged = null;
	}

	set value(value){
		this.item = {
			type: 'root',
			subitems: value.items
		}
		return this.render();
	}

	get value(){
		return this.getValue();
	}

	static set config(value) {
		for (let type in value) if (value.hasOwnProperty(type)){
			if(typeof value[type].delete === 'undefined') value[type].delete = true;
			if(typeof value[type].container === 'undefined') value[type].container = false;
			if(typeof value[type].props === 'undefined') value[type].props = [];
		}
		value.root.delete = false;
		value.root.container = true;
		value.root.props = [];

		this._config = value;
	}

	static get config(){return this._config;}

	createViewModel() { return {item: this.item};}

	getValue() { return {items: this.$$('root').brick.getSubItems()};}

	@Brick.listen('menuitem-dragged')
	dragStart(event) {
		this.dragged = event.source;
		event.cancel();
	}

	@Brick.listen('menuitem-dragend')
	dragEnd(event) {
		this.dragged = null;
		event.cancel();
	}

	@Brick.listen('menuitem-drop')
	dragDrop(event) {
		if (this.dragged !== null) try {event.data.target.before(this.dragged);} catch (e) { }
		event.cancel();
		console.log(this.value)
		console.log(JSON.stringify(this.value))
	}

}