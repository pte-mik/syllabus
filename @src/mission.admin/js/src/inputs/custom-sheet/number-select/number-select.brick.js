import twig    from "./number-select.twig";
import "./number-select.scss";
import {Brick} from "zengular";

@Brick.register('number-select', twig)
export default class extends Brick {

	createViewModel() {
		return this.data
	}

	onInitialize() {
		this.data = {
			max: this.dataset.max,
			value: this.dataset.value
		};
	}

	attachEventHandlers() {
		this.root.querySelectorAll('b').forEach(element => {
			element.addEventListener('click', event => {
				this.root.querySelector('b.selected').classList.remove('selected');
				event.target.classList.add('selected');
				this.data.value = event.target.dataset.value;

				let inputEvent = new Event('input', {
					'bubbles': true,
					'cancelable': true
				});
				this.dispatchEvent(inputEvent);
			});
		});
	}

	get value() {
		return parseInt(this.data.value);
	}

}