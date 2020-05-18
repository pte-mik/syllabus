export default class MenuParser {
	static parse(ms) {
		let structure = [];
		let work = structure;
		let tree = [structure];
		let lines = ms.split("\n").map(item => item.trim()).filter(item => item.length);
		for (let i in lines) {
			let line = lines[i];
			if (line[0] === '*') {
				let subtree = [];
				let label = this.parseLabel(line.substr(1));
				work.push({type: 'folder', label, subtree});
				tree.push(subtree);
				work = subtree;
			} else if (line === '.') {
				tree.pop();
				work = tree[tree.length - 1];
			} else if (line[0] === '-') {
				work = structure;
				tree = [structure];
				structure.push({type: 'separator'})
			} else {
				let [label, link] = line.split('>', 2);
				let type = 'link';
				label = this.parseLabel(label);
				if(link){
					link = link.trim();
					if(link[0] === '@'){
						link = link.substr(1);
						type = 'wiki';
					}
				}
				work.push({type, label, link});
			}

		}
		return structure;
	}

	static parseLabel(label) {
		let [text, icon] = label.trim().split('|', 2);
		return {text: text.trim(), icon: icon?.trim()};
	}
}