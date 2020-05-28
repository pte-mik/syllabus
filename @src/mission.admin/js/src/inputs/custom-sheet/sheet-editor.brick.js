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
import SheetSummary      from "./sheet-summary.brick"

@modalify()
@Brick.register('sheet-editor', twig)
@Brick.renderOnConstruct(false)
export default class SheetEditor extends Brick {

	onInitialize() {
		this.menu = new Contextmenu();
		this.menu.add('Modul ', 'fas fa-folder').separator();
		this.menu.add('Új modul', 'fas fa-plus-square', 'add-module').click(target => {
			let moduleIndex = typeof target.dataset.moduleIndex ? target.dataset.moduleIndex : -1;
			this.data.modules.splice(parseInt(moduleIndex) + 1, 0, {
				name_hu: "új modul",
				name_en: "new module",
				subjects: []
			});
			this.render();
		});
		this.menu.add('Sorrend szerkesztése', 'fas fa-list-ol', 'reorder-modules', 'move-module').click(target => {
			ModuleOrder.modalify(this.data, (order) => {
				let modules = [];
				order.forEach(index => modules.push(this.data.modules[index]));
				this.data.modules = modules;
				this.render();
			});
		});
		this.menu.add('Adatok szerkesztése', 'fad fa-edit', 'move-module').click(target => {
			ModuleProperties.modalify({
				module: this.data.modules[target.dataset.moduleIndex],
				db: this.db
			}, () => this.render())
		});
		this.menu.add('Törlés', 'fad fa-trash', 'delete-module').click(target => {
			if (confirm('Biztosan törölni szeretnéd a modult?')) {
				let moduleIndex = target.dataset.moduleIndex;
				this.data.modules.splice(moduleIndex, 1);
				this.render();
			}
		});
		this.menu.add('Tantárgy ', 'fad fa-users').separator();
		this.menu.add('Új tantárgy', 'fad fa-plus-square', 'add-subject').click(target => {
			NewSubject.modalify({
				module: this.data.modules[target.dataset.moduleIndex],
				db: this.db
			}, () => this.rerender());
		});
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
		this.menu.add('Adatok szerkesztése', 'fad fa-edit', 'edit-subject').click(target => {
			SubjectProperties.modalify({
				subject: this.data.modules[target.dataset.moduleIndex].subjects[target.dataset.index],
				db: this.db
			}, () => this.render())
		});
		this.menu.add('Törlés', 'fad fa-trash', 'delete-subject').click(target => {
			if (confirm('Biztosan törölni szeretnéd a tantárgyat?')) {
				let moduleIndex = target.dataset.moduleIndex;
				let subjectIndex = target.dataset.index;
				this.data.modules[moduleIndex].subjects.splice(subjectIndex, 1);
				this.render();
			}
		});
	}

	rerender() {this.render({semesters: this.semesters, sheet: this.data});}

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
		this.reorderSubjects();
		return {
			semesters: this.semesters,
			data: this.data,
			db: this.db
		};
	}

	reorderSubjects() {
		this.data.modules.forEach(module => {
			module.subjects.sort((a, b) => {

				let askill = a.pseudo ? "-1" : (this.db.get.subject(a.id).skillId + '' + this.db.get.subject(a.id).skill?.name);
				let bskill = b.pseudo ? "-1" : (this.db.get.subject(b.id).skillId + '' + this.db.get.subject(b.id).skill?.name);
				if (askill !== bskill) return askill.localeCompare(bskill);

				if (a.semester !== b.semester) return a.semester > b.semester ? 1 : -1;

				let aname = a.pseudo ? a.name_hu : this.db.get.subject(a.id).name_hu + this.db.get.subject(a.id).code;
				let bname = b.pseudo ? b.name_hu : this.db.get.subject(b.id).name_hu + this.db.get.subject(b.id).code;
				return aname.localeCompare(bname);
			})
		});
	}

	getValue() {
		return {modules: this.data.modules};
	}

	onRender() {
		this.$$('close').on.mouse.click(() => {
			this.close(this.getValue());
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
		this.$$('semester').on.input((event, target) => {
			this.data.modules[target.parentElement.dataset.moduleIndex].subjects[target.parentElement.dataset.index].semester = target.controller.value;
			this.render();
		});
		this.$$('module-spec').on.change((event, target)=>{
			this.data.modules[target.dataset.moduleIndex].spec = target.checked;
			this.render();
		});
		this.$$('subject-optional').on.change((event, target)=>{
			this.data.modules[target.dataset.moduleIndex].subjects[target.dataset.index].optional = target.checked;
			this.render();
		});
		this.$$('summary').brick.render({data:this.data, semesters: this.semesters, db: this.db});
	}
}