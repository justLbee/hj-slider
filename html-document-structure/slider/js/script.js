'use strict';

function init() {
	const slider = document.querySelectorAll('.slider');

	function Slider(container) {
		const buttons = container.getElementsByTagName('a');
		const slides = container.querySelector('.slides');
		const slider = container.querySelector('.slider-nav');
		let next, prev, first, last;

		slides.firstElementChild.classList.add('slide-current');

		Array.from(buttons).forEach(button => {
			if (button.dataset.action === 'prev') {
				prev = button;
			}
			else if (button.dataset.action === 'next') {
				next = button;
			}
			else if (button.dataset.action === 'first') {
				first = button;
			}
			else if (button.dataset.action === 'last') {
				last = button;
			}
		});

		prev.classList.add('disabled');
		first.classList.add('disabled');

		slider.addEventListener('click', changeSlide);

		function changeSlide() {
			const currentSlide = container.querySelector('.slide-current');
			let activatedSlide, currentButton, isForward, isLast;

			currentButton = event.target;

			if (currentButton.dataset.action === 'next' || currentButton.dataset.action === 'last') {
				isForward = true;
			}
			if (currentButton.dataset.action === 'last' || currentButton.dataset.action === 'first') {
				isLast = true;
			}

			if (!isLast) {
				activatedSlide = isForward ? currentSlide.nextElementSibling : currentSlide.previousElementSibling;
			} else {
				activatedSlide = (isForward) ? slides.lastElementChild : slides.firstElementChild;
			}

			currentSlide.classList.remove('slide-current');
			activatedSlide.classList.add('slide-current');

			if (!activatedSlide.nextElementSibling) {
				next.classList.add('disabled');
				last.classList.add('disabled');
			}
			else {
				next.classList.remove('disabled');
				last.classList.remove('disabled');
			}

			if (!activatedSlide.previousElementSibling) {
				prev.classList.add('disabled');
				first.classList.add('disabled');
			}
			else {
				prev.classList.remove('disabled');
				first.classList.remove('disabled');
			}
		}
	}

	Array.from(slider).forEach(element => Slider(element));
}

document.addEventListener('DOMContentLoaded', init);