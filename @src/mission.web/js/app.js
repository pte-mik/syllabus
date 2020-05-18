import "../style/app.scss";

import "./bricks/markdown.brick";
import "./bricks/nav.brick";
import "./bricks/admin.brick";
import "./bricks/menu-editor-modal.brick";
import "./bricks/wiki-editor-modal.brick";

import "./bricks/menu-editor-modal.brick";
import "./bricks/menu-editor.brick";
import "./bricks/menu-editor-item.brick";

import "./bricks/settings-editor-modal.brick";
import "./bricks/gallery.brick";

import {ZengularNotification, ZengularOverlay} from "zengular-ui";

import {Application} from "zengular";
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
	}
}

export default application;
