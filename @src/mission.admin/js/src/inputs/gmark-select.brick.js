import {Brick}    from "zengular";
import {modalify} from "zengular-ui";
import twig       from "./gmark-select.twig";
import "./gmark-select.scss";

@modalify()
@Brick.register('gmark-select', twig)
export default class GMarkSelect extends Brick {

	onRender() {
		this.$$('close').listen('click', () => {
			this.close(null)
		});
		this.$$('option').listen('click', (event, target)=>{
			this.close(target.dataset.command)
		});
	}

	beforeRender(args) {
		this.modal = {
			commands: args
		};
	}

	createViewModel() {
		return this.modal;
	}

}