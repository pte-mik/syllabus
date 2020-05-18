import "../style/app.scss";
import {Application} from "zengular";
import "./bricks/menu-editor-item.brick";
import MenuEditor    from "./bricks/menu-editor.brick";



let application = new class extends Application {

	initialize() {
		MenuEditor.config = {
			root: {
				icon: "fas fa-bars",
				content: "Menu",
				container: true
			},
			menu: {
				icon: "fad fa-folder",
				properties: ["label"],
				container: true
			},
			page: {
				icon: "fad fa-file-alt",
				properties: ["label", "link"]
			},
			link: {
				icon: "fad fa-link",
				properties: ["label", "link"],
			},
			separator: {
				icon: "fad fa-page-break",
				content: "- - -",
			}
		}; 
		console.log(MenuEditor.config)
	}

	run() {
	}

};

export default application;
