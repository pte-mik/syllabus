import {modalify} from "zengular-ui";
import {Brick}    from "zengular";
import twig       from "./new-subject.twig";
import "./new-subject.scss";

@modalify()
@Brick.register('new-subject', twig)
export default class NewSubject extends Brick {

	beforeRender(args) {
		this.module = args.module;
		console.log(this.module)
		this.db = args.db;
		this.modules = {}
		let subjects = {};
		this.db.array.subject.forEach(subject => {
			let skill;

			if (subject.skillId === null) {
				skill = {id: -1, name: '- nem kategorizált'};
			} else {
				skill = {id: subject.skill.id, name: subject.skill.name_hu}
			}

			if (typeof subjects[skill.id] === "undefined") {
				subjects[skill.id] = {
					name: skill.name,
					subjects: []
				};
			}
			subjects[skill.id].subjects.push(subject);
		})

		this.subjects = [];
		for (let skillid in subjects) {
			subjects[skillid].subjects.sort((a, b) => a.name_hu.localeCompare(b.name_hu));
			this.subjects.push(subjects[skillid]);
		}
		this.subjects.sort((a, b) => a.name.localeCompare(b.name));
		console.log(this.subjects)
	}

	onInitialize() {}

	createViewModel() {
		return {subjects: this.subjects};
	}

	onRender() {
		this.$$('ok').on.mouse.click(() => {
			this.module.subjects.push({id: this.$$('subject-id').node.value, semester: 1});
			this.close(true);
		});
		this.$$('cancel').on.mouse.click(() => this.close(false));
	}

}
