import {Brick}        from "zengular";
import twig           from "./admin.twig";
import "./admin.scss";
import MenuEditor     from "./menu-editor-modal.brick";
import WikiEditor     from "./wiki-editor-modal.brick";
import BlogEditor     from "./blog-editor-modal.brick";
import SettingsEditor from "./settings-editor-modal.brick";

@Brick.register('admin', twig)
class MarkDown extends Brick {

	createViewModel() {
		return {
			isEditor: this.dataset.editor,
			isOwner: this.dataset.owner,
			isAuthenticated: this.dataset.authenticated
		}
	}

	onRender() {
		this.$$('login').listen('click', () => document.location.href = '/login');
		this.$$('logout').listen('click', () => document.location.href = '/logout');
		this.$$('settings').listen('click', () => SettingsEditor.modalify(true));
		this.$$('blog-posts').listen('click', () => BlogEditor.modalify(true));
		this.$$('wiki-pages').listen('click', () => WikiEditor.modalify(true));
		this.$$('menu-editor').listen('click', () => MenuEditor.modalify(true));
	}

}