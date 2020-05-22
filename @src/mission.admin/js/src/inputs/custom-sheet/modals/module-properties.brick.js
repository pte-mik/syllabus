import {modalify} from "zengular-ui";
import {Brick} from "zengular";
import twig    from "./module-properties.twig";
import "./module-properties.scss";

@modalify()
@Brick.register('module-properties', twig)
export default class ModuleProperties extends Brick {

	onInitialize() {}

	createViewModel() {}

	onRender() {}

}
