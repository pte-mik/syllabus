import {Brick}     from "zengular";
import {Ajax}      from "zengular-util";
import {modalify}  from "zengular-ui";
import twig        from "./attachments-modal.twig";
import "./attachments-modal.scss";
import DataService from "../service/data-service";

@modalify()
@Brick.register('attachments', twig)
export default class AttachmentsModal extends Brick {

	beforeRender(args = null) {
		if (args !== null) {
			this.id = args.id;
			this.category = args.category;
			this.contentType = args.contentType;
			this.label = args.label;
			this.icon = args.icon;
		}
	}

	onInitialize() {}

	createViewModel() {
		return DataService.getAttachments(this.id, this.category, this.contentType);
	}

	onRender() {

		this.$$('icon').node.classList.add(...this.icon);
		this.$$('title').node.innerHTML = this.label;

		this.$$('close').listen('click', () => this.close());
		this.$$('link').listen('click', (event, target) => {
			let input = document.createElement("textarea");
			input.value = target.dataset.url;
			document.body.appendChild(input);
			input.focus();
			input.select();
			try {
				let successful = document.execCommand('copy');
				let msg = successful ? 'successful' : 'unsuccessful';
			} catch (err) {
			}
			document.body.removeChild(input);
		});

		this.$$('delete').listen('click', (event, target) => {
			if (confirm('Are you sure?')) {
				DataService.deleteAttachment(this.id, this.category, target.dataset.file, this.contentType)
					.finally(xhr => {
						this.render();
					});
			}
		});

		this.$$("dropzone", node => node.overCounter = 0)
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