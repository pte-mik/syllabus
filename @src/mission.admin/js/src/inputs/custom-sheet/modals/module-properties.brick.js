import {DragAndDrop, modalify} from "zengular-ui";
import {Brick}                 from "zengular";
import twig       from "./module-properties.twig";
import "./module-properties.scss";

@modalify()
@Brick.register('module-properties', twig)
export default class ModuleProperties extends Brick {

	beforeRender(args) {
		this.module = args.module;
		this.db = args.db;
	}

	onInitialize() {}

	createViewModel() {
		return {module: this.module, db: this.db};
	}

	onRender() {
		this.$$('ok').on.mouse.click(() =>{
			this.module.name_en = this.$$('name_en').node.value;
			this.module.name_hu = this.$$('name_hu').node.value;
			this.module.type = this.$$('type').node.value;
			this.close(true)
		});
		this.$$('cancel').on.mouse.click(() => this.close(false));
	}
}
