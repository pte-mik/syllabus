import {Ajax} from "zengular-util";

export default class DataService {

	static getMenu() {return Ajax.get('/api/site/menu').getJson.then(xhr => xhr.response);}
	static saveMenu(menu) { return Ajax.json('/api/site/menu', {menu}).getJson}

	static getSettings() { return Ajax.get('/api/site/settings').getJson.then(xhr => xhr.response);}
	static saveSettings(settings) { return Ajax.json('/api/site/settings', {settings}).getJson}


	/* WIKI */

	static getWikiPages() { return Ajax.get('/api/wiki').getJson.then(xhr => xhr.response.pages);}
	static getWikiPage(id) { return Ajax.get('/api/wiki/' + id).getJson.then(xhr => xhr.response.page);}
	static deleteWikiPage(id) { return Ajax.delete('/api/wiki/' + id).getJson;}
	static activateWikiPage(id) { return Ajax.post('/api/wiki/activate/' + id).getJson;}
	static deactivateWikiPage(id) { return Ajax.post('/api/wiki/deactivate/' + id).getJson;}
	static createWikiPage() { return Ajax.post('/api/wiki').getJson.then(xhr => xhr.response.id);}
	static saveWikiPage(id, title, slug, content) { return Ajax.json('/api/wiki/' + id, {title, slug, content}).getJson;}

	/* BLOG */

	static getBlogPosts() { return Ajax.get('/api/blog').getJson.then(xhr => xhr.response.blogposts);}
	static getBlogPost(id) { return Ajax.get('/api/blog/' + id).getJson.then(xhr => xhr.response.blogpost);}
	static deleteBlogPost(id) { return Ajax.delete('/api/blog/' + id).getJson;}
	static activateBlogPost(id) { return Ajax.post('/api/blog/activate/' + id).getJson;}
	static deactivateBlogPost(id) { return Ajax.post('/api/blog/deactivate/' + id).getJson;}

	static createBlogPost() { return Ajax.post('/api/blog').getJson.then(xhr => xhr.response.id);}
	static saveBlogPost(id, title, lead, content, published) {
		return Ajax.json('/api/blog/' + id, {
			title,
			lead,
			content,
			published
		}).getJson;
	}

	/* ATTACHMENTS */

	static getAttachments(id, category, contentType) {
		return Ajax.get('/api/attachments/' + contentType + '/' + id + '/' + category).getJson.then(xhr => xhr.response);
	}

	static deleteAttachment(id, category, file, contentType) {
		return Ajax.delete('/api/attachments/' + contentType + '/' + id + '/' + category + '/' + file).getJson
	}

	static uploadAttachments(id, files, category, contentType) {
		let uploads = [];
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			let upload = Ajax.upload('/api/attachments/' + contentType + '/' + id + '/' + category, {}, file).getJson
			uploads.push(upload);
		}
		return Promise.all(uploads);
	}
}