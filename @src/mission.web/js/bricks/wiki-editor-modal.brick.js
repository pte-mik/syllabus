import {Brick}          from "zengular";
import twig             from "./wiki-editor-modal.twig";
import "./wiki-editor-modal.scss";
import {modalify}       from "zengular-ui";
import DataService      from "../service/data-service";

import "./wiki-editor-list.brick";
import "./wiki-editor-page.brick";
import AttachmentsModal from "./attachments-modal.brick";
import Confirm          from "./confirm-modal.brick";
import {ZengularNotification} from "zengular-ui";

@modalify()
@Brick.register('wiki-editor', twig)
export default class WikiEditor extends Brick {

	onInitialize() {
		this.listen('PAGE-SELECTED', (event) => {
			event.cancel();
			this.toEditor(event.data);
		});
	}

	onRender() {
		this.$$('close').listen('click', () => this.close());
		this.$$('save').listen('click', () => {
			let data = this.$$('editor').brick.getContent();
			DataService.saveWikiPage(data.id, data.title, data.slug, data.content)
				.then(xhr=>{
					if(xhr.status === 200){
						ZengularNotification.show(ZengularNotification.style.success, 'fal fa-check', 'Page Saved');
					}else {
						ZengularNotification.show(ZengularNotification.style.danger, 'fal exclamation-triangle', 'Error occured');
					}
				})
				.then(() => this.$$('list').brick.render())
				.then(() => this.toList())
		});
		this.$$('add').listen('click', () => {
			DataService.createWikiPage()
				.then(id=>this.toEditor(id))
				.then(() => this.$$('list').brick.render());
		});
		this.$$('back').listen('click', () => {
			if (this.$$('editor').brick.isContentChanged()) {
				Confirm.modalify(true, response=>{
					if(response) this.toList();
				});
			} else {
				this.toList()
			}
		});
		this.$$('gallery').listen('click', () => AttachmentsModal.modalify({
			id: this.currentPageId,
			category: 'gallery',
			label: 'Gallery Images',
			icon: ['fal', 'fa-images'],
			contentType: 'wiki'
		}));
		this.$$('files').listen('click', () => AttachmentsModal.modalify({
			id: this.currentPageId,
			category: 'files',
			label: 'Attachments',
			icon: ['fal', 'fa-folder'],
			contentType: 'wiki'
		}));
	}

	toEditor(id) {
		this.currentPageId = id;
		this.$$('modal').node.classList.remove('list');
		this.$$('modal').node.classList.add('editor');
		this.$$('editor').brick.render(id);
	}

	toList() {
		this.$$('modal').node.classList.remove('editor');
		this.$$('modal').node.classList.add('list');
	}

}