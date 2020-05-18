import CustomElement from "phlex-custom-element";
import twig from "./template.twig";
import css from "./template.@.less";

@CustomElement.register('number-select',{twig,css})
export default class extends CustomElement{

	get templateData(){ return this.data };

	render(){
		this.data = {
			max: this.getAttribute('max'),
			value: this.getAttribute('value')
		};
		super.render();
		this.attachEventHandlers();
	}

	attachEventHandlers(){
		this.root.querySelectorAll('b').forEach(element=>{element.addEventListener('click', event=>{
			this.root.querySelector('b.selected').classList.remove('selected');
			event.target.classList.add('selected');
			this.data.value = event.target.dataset.value;

			let inputEvent = new Event('input', {
				'bubbles': true,
				'cancelable': true
			});
			this.dispatchEvent(inputEvent);
		});});
	}

	get value(){
		return parseInt(this.data.value);
	}

}