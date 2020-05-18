import Confirm from "../bricks/confirm-modal.brick";

export default function confirmModalClose() {
	return (target) => {
		target.prototype.closeConfirm = function () {
			if (this.isContentChanged()) {
				Confirm.modalify(true, response => {if (response) this.close();});
			} else {
				this.close();
			}
		};
	};
}
