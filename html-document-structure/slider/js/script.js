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
		prev.style = 'pointer-events:none';
		first.style = 'pointer-events:none';

		slider.addEventListener('click', changeSlide);

		function changeSlide() {
			event.preventDefault();
			const currentSlide = container.querySelector('.slide-current');
			let activatedSlide, currentButton;

			currentButton = event.target;

			switch(currentButton.dataset.action){
				case 'next':
					activatedSlide = currentSlide.nextElementSibling;
					break;
				case 'prev':
					activatedSlide = currentSlide.previousElementSibling;
					break;
				case	'last':
					activatedSlide = slides.lastElementChild;
					break;
				case 'first':
					activatedSlide = slides.firstElementChild;
			}

			currentSlide.classList.remove('slide-current');
			activatedSlide.classList.add('slide-current');

			updateButtons(activatedSlide);
		}
		
		function updateButtons(activatedSlide) {
			if (!activatedSlide.nextElementSibling) {
				next.classList.add('disabled');
				next.style = 'pointer-events:none';

				last.classList.add('disabled');
				last.style = 'pointer-events:none';
			}
			else {
				next.classList.remove('disabled');
				next.style = '';

				last.classList.remove('disabled');
				last.style = '';
			}

			if (!activatedSlide.previousElementSibling) {
				prev.classList.add('disabled');
				prev.style = 'pointer-events:none';

				first.classList.add('disabled');
				first.style = 'pointer-events:none';
			}
			else {
				prev.classList.remove('disabled');
				prev.style = '';

				first.classList.remove('disabled');
				first.style = '';
			}
		}
	}

	Array.from(slider).forEach(element => Slider(element));
}

document.addEventListener('DOMContentLoaded', init);