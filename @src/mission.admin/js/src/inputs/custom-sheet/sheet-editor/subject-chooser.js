import Modal from "phlex-modal";
import Ajax from "phlex-ajax";


export default class SubjectChooser {

	constructor(modalDocument){
		this.subjects = null;
	}

	show(callback){
		let modal = new Modal();
		modal.title = 'Select Subject';
		modal.class = 'frameless';
		modal.body = document.createElement('div');

		modal.addButton('Mégsem', ()=>{modal.close();});
		modal.addButton('OK', ()=>{
			let value = this.$wrapper.querySelector('select').value;
			modal.close(callback(value));
		});

		this.$wrapper = modal.body;

		if(this.subjects == null){
			this.getSubjects(()=>{
				this.render()
				modal.show();
				this.$wrapper.querySelector('select').focus();
			});
		}
		else{
			this.render();
			modal.show();
			this.$wrapper.querySelector('select').focus();
		}
	}


	getSubjects(callback){
		Ajax.request('/get-active-subjects').get().do(
				(result)=>{
					this.subjects = result.json;
					callback();
				}
		)
	}

	render(){
		let $select = document.createElement('select');
		this.subjects.forEach(subject=>{
			let $option = document.createElement('option');
			$option.setAttribute('value', subject.key);
			$option.innerText = subject.value;
			$select.appendChild($option);
		});

		this.$wrapper.appendChild($select);
	}

}