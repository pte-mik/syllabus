import {modalify} from "zengular-ui";
import {Brick} from "zengular";
import twig    from "./subject-properties.twig";
import "./subject-properties.scss";

@modalify()
@Brick.register('subject-properties', twig)
export default class SubjectProperties extends Brick {

	beforeRender(args) {
		this.subject = args.subject;
		this.db = args.db;
	}

	onInitialize() {}

	createViewModel() {
		return {subject: this.subject, db: this.db};
	}

	onRender() {
		this.$$('ok').on.mouse.click(() =>{
			this.subject.name_en = this.$$('name_en').node.value;
			this.subject.name_hu = this.$$('name_hu').node.value;
			this.subject.credits = this.$$('credits').node.value;
			this.close(true)
		});
		this.$$('cancel').on.mouse.click(() => this.close(false));
	}

}
