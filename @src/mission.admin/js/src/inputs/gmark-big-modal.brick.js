import {Brick}    from "zengular";
import {modalify} from "zengular-ui";
import twig       from "./gmark-big-modal.twig";
import "./gmark-big-modal.scss";

@modalify()
@Brick.register('gmark-big-modal', twig)
export default class GMarkBigModal extends Brick {

	onRender() {
		this.$$('close').listen('click', () =>{
			let value = this.$$('gmark').brick.getValue();
			this.valueHolder.value = value;
			this.close();
		});

		this.$$('gmark').brick.setOptions(this.options);
		this.$$('gmark').brick.setValue(this.value);
	}

	beforeRender(args) {
		this.options = args.options;
		this.value = args.value;
		this.valueHolder = args.valueHolder;
	}

}