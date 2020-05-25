import {DragAndDrop, modalify} from "zengular-ui";
import {Brick}                 from "zengular";
import twig        from "./module-order.twig";
import "./module-order.scss";
import BrickFinder from "zengular/src/brick-finder";

@modalify()
@Brick.register('module-order', twig)
export default class ModuleOrder extends Brick {

	beforeRender(data = null) {
		if (data !== null) {
			this.data = data;
		}
	}

	onInitialize() {
		this.dragged = null;
	}

	createViewModel() {
		return {data: this.data}
	}

	getValue(){
		let order = [];
		this.$$('module').nodes.forEach(item=> order.push(item.dataset.moduleIndex));
		return order;
	}

	onRender() {
		this.$$('ok').on.mouse.click(() => this.close(this.getValue()));
		new DragAndDrop(this.$$('module'), this.$$('module'), 'over').on.drop((item, target) => target.after(item));
	}
}
