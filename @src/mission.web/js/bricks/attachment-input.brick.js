import {Brick}     from "zengular";
import twig        from "./attachment-input.twig";
import "./attachment-input.scss";
import DataService from "../service/data-service";

@Brick.register('attachment-input', twig)
export default class AttachmentsModal extends Brick {

	onInitialize() {
		this.category = this.dataset.category;
		this.contentType = this.dataset.contentType;
	}

	createViewModel() {
		return DataService.getAttachments(this.id, this.category, this.contentType)
			.then(response => {
				let attachments = response.attachments;
				this.attachment = attachments.length ? attachments[0] : null;
				return {attachment: this.attachment};
			});
	}

	onRender() {

		this.$$('delete').listen('click', (event) => {
			if (this.attachment !== null) {
				if (confirm('Are you sure?')) {
					DataService.deleteAttachment(this.id, this.category, this.attachment.file, this.contentType)
						.finally(xhr => this.render());
				}
			}
		});

		if (this.attachment === null) {

			this.$$('dropzone', node => node.overCounter = 0)
				.listen('dragover', (event) => event.preventDefault())
				.listen('dragenter', (event, target) => {
					target.overCounter++;
					target.classList.add('dragover');
					event.preventDefault();
				})
				.listen('dragleave', (event, target) => {
					target.overCounter--;
					if (target.overCounter === 0) target.classList.remove('dragover');
					event.preventDefault();
				})
				.listen('drop', (event, target) => {
					event.preventDefault();
					event.stopImmediatePropagation();
					target.classList.remove('dragover');
					target.overCounter = 0;
					let files = event.dataTransfer.files;
					DataService.uploadAttachments(this.id, files, this.category, this.contentType)
						.finally(() => this.render())
				});
		}
	}


}