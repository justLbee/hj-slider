'use strict';

const eyes = document.querySelector('.block');
const message = document.querySelector('.message');
const input = document.querySelector('.textarea');

function debounce(callback, delay) {
	let timeout;

	return () => {
		if(message.classList.contains('view')) {
			message.classList.remove('view');
		}
		eyes.classList.add('active');

		clearTimeout(timeout);
		timeout = setTimeout(function () {
			timeout = null;
			callback();
		}, delay)
	}
}

input.addEventListener('keydown', debounce(() => {
	eyes.classList.remove('active');
	message.classList.add('view');
}, 2000));

input.addEventListener('focusin', () => {
	eyes.classList.add('active');
	message.classList.remove('view');
});

input.addEventListener('focusout', () => {
	eyes.classList.remove('active');
});