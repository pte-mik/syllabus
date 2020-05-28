import {Brick} from "zengular";
import twig    from "./sheet-summary.twig";
import "./sheet-summary.scss";

@Brick.register('sheet-summary', twig)
@Brick.renderOnConstruct(false)
export default class SheetSummary extends Brick {

	onInitialize() {}

	beforeRender(args) {
		this.data = args.data;
		this.semesters = args.semesters;
		this.db = args.db;
	}

	createViewModel() {
		let summary = {
			modules: [],
			base:{
				sum: new ModuleSummarizer(),
				semesters: {},
			},
			specs: []
		};

		for (let i = 1; i <= this.semesters; i++) summary.base.semesters[i] = new ModuleSummarizer();

		this.data.modules.forEach(module => {
			let modsum = {
				name: module.name_hu,
				summary: new ModuleSummarizer(),
				semesters: {},
				spec: module.spec
			}

			for (let i = 1; i <= this.semesters; i++) modsum.semesters[i] = new ModuleSummarizer();

			module.subjects.forEach(subject => {
				if (!subject.optional) {
					let subjectdata = this.db.get.subject(subject.id)
					let sum = !subject.pseudo ? {
							credits: parseInt(subjectdata.credits),
							lectures: parseInt(subjectdata.lectures),
							labPractices: parseInt(subjectdata.labPractices),
							practices: parseInt(subjectdata.practices),
							internship: parseInt(subjectdata.internship),
							exams: subjectdata.examType === 'exam' ? 1 : 0,
							signs: subjectdata.examType === 'sign' ? 1 : 0,
							midterms: subjectdata.examType === 'midterm' ? 1 : 0
						} :
						{
							credits: parseInt(subject.credits),
							lectures: 0,
							labPractices: 0,
							practices: 0,
							internship: 0,
							exams: 0,
							signs: 0,
							midterms: 0
						};

					modsum.semesters[subject.semester].add(sum);
					modsum.summary.add(sum);
					if(!module.spec){
						summary.base.sum.add(sum);
						summary.base.semesters[subject.semester].add(sum);
					}
				}
			});
			if(module.spec){
				summary.specs.push(modsum);
			}
			summary.modules.push(modsum);
		});
		return {summary};
	}

	onRender() {
	}

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