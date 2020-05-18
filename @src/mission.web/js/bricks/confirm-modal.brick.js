import {Brick}    from "zengular";
import twig       from "./confirm-modal.twig";
import "./confirm-modal.scss";
import {modalify} from "zengular-ui";

@modalify()
@Brick.register('confirm', twig)
export default class Confirm extends Brick{

	beforeRender(args) {
		args = Object.assign({
			message: "Are you sure?",
			title: "Confirm",
			icon: "fa-question-circle",
			cancel: 'CANCEL',
			ok: 'OK'
		}, args)
		this.options = args;
	}

	createViewModel() {
		return this.options;
	}

	onRender() {
		this.$$('close').listen('click', ()=>this.close(false));
		this.$$('ok').listen('click', ()=>this.close(true));
	}
}