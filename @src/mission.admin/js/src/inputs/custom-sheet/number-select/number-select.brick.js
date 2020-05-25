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

	onRender() {
		this.$$('select').on.click((event, target) => {
			this.$('b.selected').each(item => item.classList.remove('selected'));
			target.classList.add('selected');
			if (this.data.value != target.dataset.value) {
				this.data.value = target.dataset.value;
				this.root.dispatchEvent(new Event('input', {'bubbles': true, 'cancelable': true}));
			}
		});
	}

	get value() {
		return parseInt(this.data.value);
	}

}