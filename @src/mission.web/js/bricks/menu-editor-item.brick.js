import {Brick}    from "zengular";
import twig       from "./menu-editor-item.twig";
import "./menu-editor-item.scss";
import MenuEditor from "./menu-editor.brick";

@Brick.register('menu-editor-item', twig)
export default class MenuItem extends Brick {

	onInitialize() {
		try {
			this.item = JSON.parse(this.root.innerHTML);
		} catch (e) {
			this.item = [];
		}
	}

	createViewModel() {
		return {
			item: this.item,
			config: MenuEditor.config
		};
	}

	get items(){
		let subitems = [];
		this.$$('item').each(item => subitems.push(item.controller.getValue()));
		return subitems;
	}

	getValue() {
		let value = {
			type: this.item.type
		};

		let cfg = MenuEditor.config[this.item.type];
		if(typeof cfg.properties !== 'undefined'){
			value.properties = {};
			for(let property of cfg.properties){
				value.properties[property] = this.$$('property').filter("[data-property=\""+property+"\"]")?.node.value;
			}
		}
		if (cfg.container) {
			value.subitems = this.getSubItems();
		}
		return value;
	}

	getSubItems(){
		let subitems = [];
		this.$$('item').each(item=> {
			subitems.push(item.controller.getValue());
		});
		return subitems;
	}

	onRender() {

		this.$$('delete').listen('click', (event, target) => {
			this.root.remove();
		});

		this.$$('add').listen('click', (event, target) => {
			let item = MenuItem.create().then(brick=>{
				brick.item = { type: target.dataset.type };
				brick.actor('item');
				brick.render();
				this.$('.subitems>.dropzone').node.before(brick.root);
			})
		});

		this.$$('element').listen('dragstart', () => {
			this.fire('menuitem-dragged')
			event.stopPropagation();
		});

		this.$$('dropzone').listen('dragenter', (event, target) => {
			target.classList.add('over');
			event.stopPropagation();
		});

		this.$$('dropzone').listen('dragleave', (event, target) => {
			target.classList.remove('over');
			event.stopPropagation();
		});

		this.$$('dropzone').listen('dragover', event => event.preventDefault())

		this.$$('dropzone').listen('dragend', event => {
			this.fire('menuitem-dragend');
			event.stopPropagation()
		});

		this.$$('dropzone').listen('drop', (event, target) => {
			target.classList.remove('over');
			this.fire('menuitem-drop', {target: target.dataset.beforeThis === 'yes' ? target : this.root})
			event.stopPropagation()
		});
	}

}
