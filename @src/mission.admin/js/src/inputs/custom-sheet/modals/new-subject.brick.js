import {modalify} from "zengular-ui";
import {Brick} from "zengular";
import twig    from "./new-subject.twig";
import "./new-subject.scss";

@modalify()
@Brick.register('new-subject', twig)
export default class NewSubject extends Brick {

	onInitialize() {}

	createViewModel() {}

	onRender() {}

}
