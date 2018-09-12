'use strict';

const done = document.querySelector('.done');
const undone = document.querySelector('.undone');
const labels = document.querySelectorAll('input');

Array.from(labels).forEach(label => {
	label.addEventListener('click', e => {
		if(!e.target.checked) {
			undone.appendChild(e.target.parentElement);
			return;
		}
		done.appendChild(e.target.parentElement);
	})
});
