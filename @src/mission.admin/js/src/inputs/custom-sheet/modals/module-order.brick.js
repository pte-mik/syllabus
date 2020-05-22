import {modalify} from "zengular-ui";
import {Brick} from "zengular";
import twig    from "./module-order.twig";
import "./module-order.scss";

@modalify()
@Brick.register('module-order', twig)
export default class ModuleOrder extends Brick {

	beforeRender(data){
		console.log(data)
	}

	onInitialize() {}

	createViewModel() {}

	onRender() {
		this.$$('ok').on.mouse.click(()=>this.close());
	}

}
