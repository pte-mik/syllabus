import "./number-select/number-select.brick";
import twig              from "./sheet-editor.twig";
import "./sheet-editor.scss";
import {modalify}        from "zengular-ui";
import {Brick}           from "zengular";
import {Ajax, RJson}     from "zengular-util";
import Contextmenu       from "zengular-ui/contextmenu/contextmenu";
import SubjectProperties from "./modals/subject-properties.brick";
import ModuleOrder       from "./modals/module-order.brick";
import ModuleProperties  from "./modals/module-properties.brick";
import NewSubject        from "./modals/new-subject.brick";

@modalify()
@Brick.register('sheet-editor', twig)
export default class SheetEditor extends Brick {

	onInitialize() {
		this.menu = new Contextmenu();
		this.menu.add('Modul ', 'fas fa-folder').separator();
		this.menu.add('Új modul', 'fas fa-plus-square', 'add-module').click(ctx => {
			this.data.modules.push({name_hu: "új modul", name_en: "new module", subjects: []});
			this.render();
		});
		this.menu.add('Sorrend szerkesztése', 'fas fa-list-ol', 'reorder-modules', 'move-module').click(target => {
			ModuleOrder.modalify(this.data);
		});
		this.menu.add('Adatok szerkesztése', 'fad fa-edit', 'move-module').click(ctx => { console.log(ctx)});
		this.menu.add('Törlés', 'fad fa-trash', 'delete-module').click(target => {
			if (confirm('Biztosan törölni szeretnéd a modult?')) {
				let moduleIndex = target.dataset.moduleIndex;
				this.data.modules.splice(moduleIndex, 1);
				this.render();
			}
		});
		this.menu.add('Tantárgy ', 'fad fa-users-class').separator();
		this.menu.add('Új tantárgy', 'fad fa-plus-square', 'add-subject').click(ctx => { console.log(ctx)});
		this.menu.add('Új pszeudo tantárgy', 'fal fa-plus-square', 'add-pseudo-subject').click(target => {
			let moduleIndex = target.dataset.moduleIndex;
			this.data.modules[moduleIndex].subjects.push({
				name_hu: 'pszeudo tárgy',
				name_en: 'pseudo subject',
				credits: 1,
				semester: 1,
				pseudo: true
			});
			this.render();
		});
		this.menu.add('Adatok szerkesztése', 'fad fa-edit', 'edit-subject').click(ctx => { console.log(ctx)});
		this.menu.add('Törlés', 'fad fa-trash', 'delete-subject').click(target => {
			if (confirm('Biztosan törölni szeretnéd a tantárgyat?')) {
				let moduleIndex = target.dataset.moduleIndex;
				let subjectIndex = target.dataset.index;
				this.data.modules[moduleIndex].subjects.splice(subjectIndex, 1);
				this.render();
			}
		});
	}

	rerender() {
		this.render({semeters: this.semesters, sheet: this.data});
	}

	createScema() {
		let schema = RJson.schema();

		schema.define('user', null, 'key')
			.field(['value'])
			.getter('name', (item) => {return item.value})
			.stringify(item => item.value)
		;

		schema.define('skill', null, 'id')
			.field(['name_hu', "name_en", "responsibleId"])
			.relation('responsible', 'user', 'responsibleId', 'skills')
		;

		schema.define('moduletype', null, 'id')
			.field(['name'])
		;

		schema.define('subject', null, 'id')
			.field([
				"code",
				"credits",
				"description_en",
				"description_hu",
				"examType",
				"internship",
				"labPractices",
				"lectures",
				"level",
				"mandatory",
				"name_en",
				"name_hu",
				"practices",
				"responsibleId",
				"skillId",
				"status"]
			)
			.relation('responsible', 'user', 'responsibleId', 'subjects')
			.relation('skill', 'skill', 'skillId', 'subjects')
		;
		return schema;
	}

	beforeRender(value = null) {
		if (value !== null) {
			this.data = value.sheet;
			this.semesters = value.semesters;
			this.db = new RJson(this.createScema(), {});
			return Promise.all([
				Ajax.get('/api/subjects/all').getJson
					.then(xhr => {
						this.db.load('subject', xhr.response);
						let userIds = [];
						for (let i in this.db.storage.subject) {
							userIds.push(this.db.storage.subject[i].responsibleId);
						}
						return [...new Set(userIds)];
					})
					.then(userIds => { return Ajax.get('/api/users/' + userIds.join(',')).getJson })
					.then(xhr => { this.db.load('user', xhr.response) })
				,
				Ajax.get('/api/skills/all').getJson.then(xhr => { this.db.load('skill', xhr.response) }),
				Ajax.get('/api/moduletypes/all').getJson.then(xhr => { this.db.load('moduletype', xhr.response) }),
			]);
		}
	}

	createViewModel() {
		return {
			semesters: this.semesters,
			data: this.data,
			db: this.db
		};
	}

	getValue() {
		return true;
	}

	onRender() {
		this.$$('close').on.mouse.click(() => {
			this.fire('value-changed', {value: this.getValue()})
			this.close();
		});
		this.$$('header').on.mouse.contextMenu((event, target) => {
			this.menu.show(event, target);
			this.menu.disableAll();
			this.menu.enable('add-module', 'reorder-modules');
		});
		this.$$('module').on.mouse.contextMenu((event, target) => {
			this.menu.show(event, target);
			this.menu.enableAll();
			this.menu.disable('edit-subject', 'delete-subject');
		});
		this.$$('skill').on.mouse.contextMenu((event, target) => {
			this.menu.show(event, target);
			this.menu.enableAll();
			this.menu.disable('edit-subject', 'delete-subject');

		});
		this.$$('subject').on.mouse.contextMenu((event, target) => {
			this.menu.show(event, target);
			this.menu.enableAll();
			this.menu.disable('edit-subject');
		});
		this.$$('pseudo-subject').on.mouse.contextMenu((event, target) => {
			this.menu.show(event, target);
			this.menu.enableAll();
		});
	}

//	data = null;
//	subjects = [];
//	moduleTypes;
//	subjectChooser = new SubjectChooser(window.parent);
//	options = {};

//	get templateData(){ return {data: this.data, options: this.options, moduleTypes: this.moduleTypes}; }
//
//	render(){
//		if(this.data == null) return;
//		this.collectModuleTypes()
//		.then(()=> 	this.collectSubjectDetails())
//		.then(() => {
//			this.normalizeSubjects();
//			this.calculateModuleSummary();
//			this.calculateSummary();
//			super.render();
//			this.attachEventHandlers();
//		});
//	}
//
//	set value(value){
//		this.data = JSON.parse(value);
//		this.render();
//	}
//
//	get value(){
//		delete module.details;
//		this.data.modules.forEach(module => {
//			delete module.details;
//			module.subjects.forEach(subject => {
//				delete subject.details;
//			});
//		});
//		return JSON.stringify(this.data);
//	}
//
//	attachEventHandlers(){
//
//		this.root.querySelector('[role=add-module]').addEventListener('click', event => {
//			this.data.modules.push({name: "new module", subjects: []});
//			this.render();
//		});
//
//		this.root.querySelectorAll('input[name=module-name-hu]').forEach(element => {
//			element.addEventListener('change', event => {
//				let moduleIndex = event.target.closest('tr[role=module]').dataset.index;
//				this.data.modules[moduleIndex].name_hu = event.target.value;
//				this.render();
//			});
//		});
//
//		this.root.querySelectorAll('input[name=module-name-en]').forEach(element => {
//			element.addEventListener('change', event => {
//				let moduleIndex = event.target.closest('tr[role=module]').dataset.index;
//				this.data.modules[moduleIndex].name_en = event.target.value;
//			});
//		});
//
//		this.root.querySelectorAll("[role=module-specialization]").forEach(element => {
//			element.addEventListener('input', event => {
//				let moduleIndex = event.target.closest('tr[role=module]').dataset.index;
//				this.data.modules[moduleIndex].spec = event.target.checked;
//				this.render();
//			});
//		});
//		this.root.querySelectorAll("[role=module-type]").forEach(element => {
//			element.addEventListener('change', event => {
//				let moduleIndex = event.target.closest('tr[role=module]').dataset.index;
//				this.data.modules[moduleIndex].type = event.target.value;
//				//this.render();
//			});
//		});
//
//		this.root.querySelectorAll("[role=subject-optional]").forEach(element => {
//			element.addEventListener('input', event => {
//				let index = event.target.closest('tr[role=subject]').dataset.index;
//				let moduleIndex = event.target.closest('tr[role=subject]').dataset.moduleIndex;
//				this.data.modules[moduleIndex].subjects[index].optional = event.target.checked;
//				this.render();
//			});
//		});
//
//		this.root.querySelectorAll('input[name=pseudo-subject-name-hu]').forEach(element => {
//			element.addEventListener('change', event => {
//				let index = event.target.closest('tr[role=subject]').dataset.index;
//				let moduleIndex = event.target.closest('tr[role=subject]').dataset.moduleIndex;
//				this.data.modules[moduleIndex].subjects[index].name_hu = event.target.value;
//				this.render();
//			});
//		});
//		this.root.querySelectorAll('input[name=pseudo-subject-name-en]').forEach(element => {
//			element.addEventListener('change', event => {
//				let index = event.target.closest('tr[role=subject]').dataset.index;
//				let moduleIndex = event.target.closest('tr[role=subject]').dataset.moduleIndex;
//				this.data.modules[moduleIndex].subjects[index].name_en = event.target.value;
//				this.render();
//			});
//		});
//
//		this.root.querySelectorAll("input[name=pseudo-subject-credits]").forEach(element => {
//			element.addEventListener('input', event => {
//				let val = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);
//				event.target.value = val;
//			});
//			element.addEventListener('change', event => {
//				let index = event.target.closest('tr[role=subject]').dataset.index;
//				let moduleIndex = event.target.closest('tr[role=subject]').dataset.moduleIndex;
//				let val = isNaN(parseInt(event.target.value)) ? 0 : parseInt(event.target.value);
//				this.data.modules[moduleIndex].subjects[index].credits = val;
//				this.render();
//			});
//		});
//
//		this.root.querySelectorAll("[role=add-subject]").forEach(element => {
//			element.addEventListener('click', event => {
//				let moduleIndex = event.target.closest('tr[role=module]').dataset.index;
//				this.subjectChooser.show((value) => {
//					this.data.modules[moduleIndex].subjects.push({
//						id: value,
//						semester: 1
//					});
//					this.render();
//				});
//			});
//		});
//
//		this.root.querySelectorAll("[role=add-pseudo-subject]").forEach(element => {
//			element.addEventListener('click', event => {
//				let moduleIndex = event.target.closest('tr[role=module]').dataset.index;
//				this.data.modules[moduleIndex].subjects.push({
//					name_hu: 'pszeudo tárgy',
//					name_en: 'pseudo subject',
//					credits: 1,
//					semester:1,
//					pseudo: true
//				});
//				this.render();
//			});
//		});
//
//		this.root.querySelectorAll("[role=delete-subject]").forEach(element => {
//			element.addEventListener('click', event => {
//				if(confirm('Biztosan törölni szeretnéd?')){
//					let index = event.target.closest('tr[role=subject]').dataset.index;
//					let moduleIndex = event.target.closest('tr[role=subject]').dataset.moduleIndex;
//					this.data.modules[moduleIndex].subjects.splice(index, 1);
//					this.render();
//				}
//			});
//		});
//
//		this.root.querySelectorAll("[role=delete-module]").forEach(element => {
//			element.addEventListener('click', event => {
//				if(confirm('Biztosan törölni szeretnéd?')){
//					let index = event.target.closest('tr[role=module]').dataset.index;
//					this.data.modules.splice(index, 1);
//					this.render();
//				}
//			});
//		});
//
//		this.root.querySelectorAll("[name=subject-semester]").forEach(element => {
//			element.addEventListener('input', event => {
//				let index = event.target.closest('tr[role=subject]').dataset.index;
//				let moduleIndex = event.target.closest('tr[role=subject]').dataset.moduleIndex;
//				this.data.modules[moduleIndex].subjects[index].semester = event.target.value;
//				this.render();
//			});
//		});
//	}
//
//	collectModuleTypes(){
//		return new Promise(resolve => {
//			Ajax.request('/get-module-types').post().promise().then(response => {
//				this.moduleTypes = response.json;
//				resolve();
//			})
//		});
//	}
//
//	collectSubjectDetails(){
//		return new Promise(resolve => {
//			let collectSubject = [];
//			this.data.modules.forEach(module => {
//				module.subjects.forEach(subject => {
//					if(subject.hasOwnProperty('id') && !this.subjects.hasOwnProperty(subject.id)) collectSubject.push(subject.id);
//				});
//			});
//			collectSubject = [...new Set(collectSubject)];
//			Ajax.request('/get-subject-data').postJSON(collectSubject).promise()
//			.then(response => {
//				response.json.forEach(subject => {
//					this.subjects[subject.id] = subject;
//				});
//				resolve();
//			});
//		});
//	}
//
//	normalizeSubjects(){
//		this.data.modules.forEach(module => {
//			module.subjects.forEach(subject => {
//				subject.semester = parseInt(subject.semester);
//				if(subject.pseudo){
//					subject.details = {
//						name_hu: subject.name_hu,
//						name_en: subject.name_en,
//						skillId: 0,
//						lectures: 0,
//						labPractices: 0,
//						practices: 0,
//						internship: 0,
//						credits: subject.credits
//					};
//				}else{
//					subject.details = this.subjects[subject.id];
//				}
//			});
//			module.subjects.sort((a, b) => {
//				// if(a.optional && !b.optional) return 1;
//				// if(!a.optional && b.optional) return -1;
//				if(a.pseudo && !b.pseudo) return 1;
//				if(!a.pseudo && b.pseudo) return -1;
//				if(a.details.skillId > b.details.skillId) return 1;
//				if(a.details.skillId < b.details.skillId) return -1;
//				if(a.semester > b.semester) return 1;
//				if(a.semester < b.semester) return -1;
//				if(a.details.name_hu > b.details.name_hu) return 1;
//				if(a.details.name_hu < b.details.name_hu) return -1;
//				return 0;
//			});
//		});
//	}
//
//	calculateModuleSummary(){
//		this.data.modules.forEach(module => {
//			let semesters = {};
//			let summary = new ModuleSummarizer();
//
//			module.subjects.forEach(subject => {
//				if(!subject.optional){
//					if(!semesters.hasOwnProperty(subject.semester)){
//						semesters[subject.semester] = new ModuleSummarizer();
//					}
//
//					let subjectDetails = subject.details; //this.subjects[subject.id];
//
//					let sum = {
//						credits: parseInt(subjectDetails.credits),
//						lectures: parseInt(subjectDetails.lectures),
//						labPractices: parseInt(subjectDetails.labPractices),
//						practices: parseInt(subjectDetails.practices),
//						internship: parseInt(subjectDetails.internship),
//						exams: subjectDetails.examType === 'exam' ? 1 : 0,
//						signs: subjectDetails.examType === 'sign' ? 1 : 0,
//						midterms: subjectDetails.examType === 'midterm' ? 1 : 0
//					};
//
//					semesters[subject.semester].add(sum);
//					summary.add(sum);
//				}
//			});
//			if(!module.hasOwnProperty('details')) module.details = {};
//			module.details.summary = summary;
//			module.details.semesterSummary = semesters;
//		});
//	}
//
//	calculateSummary(){
//		let semesters = {};
//		let summary = new ModuleSummarizer();
//		this.data.summary = {general: {semesters, summary}, modules: []};
//
//		this.data.modules.forEach(module => {
//			if(!module.spec){
//				for(let semesterNumber in module.details.semesterSummary){
//					if(!semesters.hasOwnProperty(semesterNumber)){
//						semesters[semesterNumber] = new ModuleSummarizer();
//					}
//					semesters[semesterNumber].add(module.details.semesterSummary[semesterNumber]);
//					summary.add(module.details.semesterSummary[semesterNumber]);
//				}
//			}else{
//				this.data.summary.modules.push(module);
//			}
//		});
//	}
}

class Summarizer {
	constructor(obj) { for (var prop in obj) this[prop] = obj[prop]; }

	add(obj) { for (var prop in obj) this[prop] += obj[prop]; }
}

class ModuleSummarizer extends Summarizer {
	constructor() {
		super({
			credits: 0,
			lectures: 0,
			labPractices: 0,
			practices: 0,
			internship: 0,
			exams: 0,
			signs: 0,
			midterms: 0
		});
	}
}