import {modalify} from "zengular-ui";
import {Brick} from "zengular";
import twig    from "./subject-properties.twig";
import "./subject-properties.scss";

@modalify()
@Brick.register('subject-properties', twig)
export default class SubjectProperties extends Brick {

	onInitialize() {}

	createViewModel() {}

	onRender() {}

}
