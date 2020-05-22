import {modalify} from "zengular-ui";
import {Brick} from "zengular";
import twig    from "./module-order.twig";
import "./module-order.scss";

@modalify()
@Brick.register('module-order', twig)
export default class ModuleOrder extends Brick {

	beforeRender(data = null){
		if(data !== null) {
			this.data = data;
		}
	}

	onInitialize() {
		this.dragged = null;
	}

	createViewModel() {
		return {data: this.data}
	}

	onRender() {
		this.$$('ok').on.mouse.click(()=>this.close());
		this.$$('module').on.drag.start((event, target)=>{
			this.dragged = target;
		});
		this.$$('module').on.drag.end((event, target)=>{
			this.$$('module').filter('.over').each(item=>item.classList.remove('over'));
			this.dragged = null;
		});
		this.$$('module').on.drag.over((event, target)=>{
			target.classList.add('over');
			event.preventDefault()
		});
		this.$$('module').on.drag.leave((event, target)=>{
			target.classList.remove('over');
		});
		this.$$('module').on.drag.drop((event, target)=>{
			if(this.dragged !== null){
				this.data.modules.splice(target.dataset.moduleIndex, 0, this.data.modules.splice(this.dragged.dataset.moduleIndex, 1)[0]);
				this.render();
			}
			this.dragged = null;
		});
		//		this.root.addEventListener('dragstart', (event) => {
		//			this.fire('gmark-block-dragged')
		//		});
		//		this.root.addEventListener('dragend', event => {
		//			this.fire('gmark-block-dragend');
		//		});
		//		this.root.addEventListener('dragover', event => {
		//			this.$$('add-block').node.classList.add('over');
		//		});
		//		this.root.addEventListener('dragleave', event => {
		//			this.$$('add-block').node.classList.remove('over');
		//		});
		//		this.root.addEventListener('dragover', event => event.preventDefault())
		//
		//		this.root.addEventListener('drop', (event) => {
	}

}
