'use strict';

function init() {
	const slider = document.querySelectorAll('.slider');

	function Slider(container) {
		const buttons = container.getElementsByTagName('a');
		const slides = container.querySelector('.slides');
		const slider = container.querySelector('.slider-nav');
		let next, prev, first, last;

		slides.firstElementChild.classList.add('slide-current');

		// Array.from(buttons).forEach(button => {
		// 	if(button.dataset.action === 'prev') {
		// 		prev = button;
		// 	}
		// 	else if(button.dataset.action === 'next') {
		// 		next = button;
		// 	}
		// 	else if(button.dataset.action === 'first') {
		// 		first = button;
		// 	}
		// 	else if(button.dataset.action === 'last') {
		// 		last = button;
		// 	}
		// });

		// prev.classList.add('disabled');
		// first.classList.add('disabled');

		// next.addEventListener('click', event =>	 changeSlide(true));
		// prev.addEventListener('click', event => changeSlide(false));
		// last.addEventListener('click', event =>	 changeSlide(true, true));
		// first.addEventListener('click', event => changeSlide(false, true));

		slider.addEventListener('click', changeSlide);

		function changeSlide() {
			const currentSlide = container.querySelector('.slide-current');
			let isForward, activatedSlide;

			if (event.target.dataset.action === 'next' ) {
				next = event.target;
				isForward = true;
			}
			else if(event.target.dataset.action === 'last') {
				last = event.target;
				isForward = true;
			}

			activatedSlide = (isForward) ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;

			if(!activatedSlide.nextElementSibling) {
				next.classList.add('disabled');
				last.classList.add('disabled');
			}
			else {
				next.classList.remove('disabled');
				last.classList.remove('disabled');
			}

			if (!activatedSlide.previousElementSibling) {
				event.target.classList.add('disabled');
				// first.classList.add('disabled');
			}
			else {
				event.target.classList.remove('disabled');
				// first.classList.remove('disabled');
			}

			currentSlide.classList.remove('slide-current');
			activatedSlide.classList.add('slide-current');

		}

		// function changeSlide(isForward, isLast = false) {
		// 	const currentSlide = container.querySelector('.slide-current');
		// 	let activatedSlide;
		//
		// 	if(!isLast) {
		// 		activatedSlide = (isForward) ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
		// 	}
		// 	else {
		// 		activatedSlide = (isForward) ? slides.lastElementChild : slides.firstElementChild;
		// 	}
		//
		// 	if((!isForward && !currentSlide.previousElementSibling) || (isForward && !currentSlide.nextElementSibling)) {
		// 		event.preventDefault();
		// 		return;
		// 	}
		//
		// 	if(!activatedSlide.nextElementSibling) {
		// 		next.classList.add('disabled');
		// 		last.classList.add('disabled');
		// 	}
		// 	else {
		// 		next.classList.remove('disabled');
		// 		last.classList.remove('disabled');
		// 	}
		//
		// 	if(!activatedSlide.previousElementSibling) {
		// 		prev.classList.add('disabled');
		// 		first.classList.add('disabled');
		// 	}
		// 	else {
		// 		prev.classList.remove('disabled');
		// 		first.classList.remove('disabled');
		// 	}
		//
		// 	currentSlide.classList.remove('slide-current');
		// 	activatedSlide.classList.add('slide-current');
		// }
	}

	Array.from(slider).forEach(element => Slider(element));
}

document.addEventListener('DOMContentLoaded', init);