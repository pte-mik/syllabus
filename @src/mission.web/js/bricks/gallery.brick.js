import {Brick} from "zengular";
import twig  from "./gallery.twig";
import "./gallery.scss";

@Brick.register('wiki-gallery', twig)
class Gallery extends Brick {

	onInitialize() {
		this.images = this.root.innerHTML.split("\n").map(s => s.trim()).filter(s=>s.length).map(s=>{
			let split = s.split('|');
			return{thumbnail: split[0], url: split[1]};
		});
	}

	createViewModel() {
		return {
			images: this.images,
			image: this.images[0]
		}
	}

	onRender() {
		this.viewer = this.$$('viewer').node;
		let galleryItems = this.$('.gallery-item').nodes;
		this.first = galleryItems[0];
		this.last = galleryItems[galleryItems.length - 1];

		this.$$('thumbnail').listen('click', (event, target)=>{
			this.$$('gallery-item').each(item=>item.classList.remove('current'));
			this.$$('gallery-item').filter('[data-index="'+target.dataset.index+'"]').node.classList.add('current');
			this.open();
			event.stopPropagation();
		});

		this.$$('viewer').listen('click', (event, target) => {
			this.close();
			event.stopPropagation();
		});
		this.$$('gallery-item').filter(' img').listen('click', event => {
			this.next();
			event.stopPropagation();
		});

		this.$$('next').listen('click', event => {
			this.next();
			event.stopPropagation();
		});

		this.$$('prev').listen('click', event => {
			this.prev();
			event.stopPropagation();
		});

		this.root.classList.add('rendered');
	}


	open(){
		if(!this.initialized){
			this.$('.gallery-item img').each(element=>element.setAttribute('src', element.dataset.src));
			this.initialized = true;
		}
		this.viewer.classList.add('visible');
		document.addEventListener('keydown', this.onKeyDown);
	}


	close(){
		this.viewer.classList.remove('visible');
		document.removeEventListener('keydown', this.onKeyDown);
	}

	next(){
		let item = this.$('.gallery-item.current').node;
		var next = item.nextElementSibling;
		if(next === null || !next.classList.contains('gallery-item')) next = this.first;
		next.classList.add('current');
		item.classList.remove('current');
	}

	prev(){
		let item = this.$('.gallery-item.current').node;
		var next = item.previousElementSibling;
		if(next === null || !next.classList.contains('gallery-item')) next = this.last;
		next.classList.add('current');
		item.classList.remove('current');

	}

	onKeyDown = event => {
		if(this.images.length > 1) {
			if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
				this.prev();
				event.preventDefault();
			}
			if (event.key === ' ' || event.key === 'ArrowRight' || event.key === 'ArrowDown') {
				this.next();
				event.preventDefault();
			}
		}
		if(event.key === 'Escape'){
			this.close();
			event.preventDefault();
		}
	};
}