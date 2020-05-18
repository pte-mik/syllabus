import {Brick} from "zengular";
import twig    from "./gmark-block.twig";
import "./gmark-block.scss";

@Brick.register('gmark-block', twig)

export default class GMarkBlock extends Brick {

	setup(data) {
		this.data = data;
		this.command = data.command;
		this.render();
	}

	toString() {
		console.log(this.command);
		let string = "";
		if (this.command) {
			string += this.command.as;
			this.$$('attribute').each(attribute => {
				string += " " + attribute.dataset.attribute + '="' + attribute.value + '"';
			})
		}
		if (this.$$('body').nodes.length && this.$$('body').node?.value.trim()) {
			if (this.command)string += "\n";
			string += this.$$('body').node?.value.trim();
		}
		return string;
	}

	onInitialize() {
		this.root.draggable = true;
		this.root.addEventListener('dragstart', (event) => {
			this.fire('gmark-block-dragged')
		});
		this.root.addEventListener('dragend', event => {
			this.fire('gmark-block-dragend');
		});
		this.root.addEventListener('dragover', event => {
			this.$$('add-block').node.classList.add('over');
		});
		this.root.addEventListener('dragleave', event => {
			this.$$('add-block').node.classList.remove('over');
		});
		this.root.addEventListener('dragover', event => event.preventDefault())

		this.root.addEventListener('drop', (event) => {
			event.preventDefault();
			this.$$('add-block').node.classList.remove('over');
			this.fire('gmark-block-drop')
		});
	}

	createViewModel() {
		return this.data;
	}

	onRender() {
		this.$('textarea').each(node => {
			node.style.height = 'auto';
			node.style.height = node.scrollHeight + 'px';
		});
		this.$('textarea').listen('input', (event, target) => {
			target.style.height = 'auto';
			target.style.height = target.scrollHeight + 'px';
		});
		this.$$('add-block').listen('click', event => {
			this.fire('add-new-block');
		});
		this.$$('delete').listen('click', event => {
			if (confirm('Are you sure?')) {
				this.root.remove();
			}
		})
	}

}