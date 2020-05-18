import {Brick}              from "zengular";
import twig                 from "./nav.twig";
import "./nav.scss";

@Brick.register('nav', twig)
class MarkDown extends Brick {

	onInitialize() {
		this.content = this.root.innerHTML;
	}

	createViewModel() {
		return {
			content: this.content
		}
	}

	onRender() {
		this.$$('folder').listen('click', (event, target)=>{
			let li = target.parentElement;
			li.classList.toggle('open');
			localStorage.setItem(`category-${li.dataset.id}`, li.classList.contains('open') ? 'yes' : 'no');
		});

		let index = 0;
		this.$$('folder').each(category=>{
			let li = category.parentElement;
			li.dataset.id = index;
			if(localStorage.getItem(`category-${index}`) === 'yes'){
				li.classList.add('open');
			}
			index++;
		});

	}

}