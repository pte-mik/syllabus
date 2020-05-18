import AbstractInputBrick from "zengular-codex/admin/inputs/~abstract-input-brick";
import {Brick}    from "zengular";
import twig       from "./gmark.twig";
import "./gmark.scss";
import GMarkBlock from "./gmark-block.brick";
import AppEvent           from "zengular/src/app-event";
import GMarkSelect        from "./gmark-select.brick";

@Brick.register('codex-input-gmark', twig)
@Brick.registerSubBricksOnRender()

export default class InputGmark extends AbstractInputBrick {
	getDefaultOptions() { return {rows: 25}}
	getValue() {
		let value = [];
		this.$('[is="gmark-block"]').each(block=>value.push(block.controller.toString()));
		return value.join("\n\n");
	}
	setValue(value) {
		console.log(value)
		if (typeof value !== "string") value = null;
		let blocks = this.parse(value);
		blocks.forEach(block => this.addBlock(block));
	}

	onInitialize() {
		this.dragged = null;
	}

	@Brick.listen('gmark-block-dragend')
	dragEnd(event) {
		this.dragged = null;
		event.cancel();
	}

	@Brick.listen('gmark-block-dragged')
	dragStart(event) {
		this.dragged = event.source;
		event.cancel();
	}

	@Brick.listen('gmark-block-drop')
	dragDrop(event) {
		if (this.dragged !== null) {
			this.placeBlock(this.dragged, event.source);
		}
		event.cancel();
	}

	@Brick.listen('add-new-block')
	addNewBlock(event) {
		let after = event.source
		if (event.source.controller === this) {
			after = this.$$('add-block').node;
		}
		GMarkSelect.modalify(this.options.gmark, (command) => {
			if (command === null) return;
			let block = {
				command: this.options.gmark[command],
				attributes: [],
				body: ''
			};
			GMarkBlock.create('div').then(newblock => {
				newblock.setup(block);
				this.placeBlock(newblock.root, after);
			});
		});
	}

	setOptions(options) {
		return super.setOptions(options)
	}

	parse(text) {
		if(text === null) return [];
		text = text.replace(/\n{3,}/g, "\n\n");
		let blocks = [];
		let parts = text.toString().split("\n\n");

		parts.forEach(part => {
			// find command
			let lines = part.split("\n");
			let commandline = lines.shift();
			let command = commandline.split(' ')[0];
			if (typeof this.options.gmark[command] === 'undefined' && blocks.length) {
				console.log('command '+command)
				blocks[blocks.length-1].body += "\n\n"+part;
			} else {
				let attributes = [];
				let attrstring = commandline.substr(command.length);
				if (attrstring) {
					let t = document.createElement('div');
					t.innerHTML = '<div ' + attrstring + '></div>';
					let attrNames = t.childNodes[0].getAttributeNames();
					attrNames.forEach(attrName => {
						attributes[attrName] = t.childNodes[0].getAttribute(attrName);
					});
				}
				blocks.push({
					command: this.options.gmark[command],
					attributes: attributes,
					body: lines.join("\n")
				});
			}
		});
		return blocks;
	}

	addBlock(block) {
		GMarkBlock.create('div').then(newblock => {
			newblock.setup(block);
			this.placeBlock(newblock.root);
		});
	}

	placeBlock(block, after = null) {
		if (after === null) this.$$('blocks').node.appendChild(block);
		else after.after(block);
	}

	onRender() {
		this.$$('add-block').listen('click', event => {
			this.fire('add-new-block');
		})
	}
}