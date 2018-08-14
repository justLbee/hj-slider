'use strict';

const done = document.querySelector('.done');
const undone = document.querySelector('.undone');
const labels = document.getElementsByTagName('label');


Array.from(labels).forEach(label => {
	label.childNodes.forEach(task => {
		task.addEventListener('click', () => {
			if (!task.checked) {
				undone.appendChild(label);
				return;
			}
			done.appendChild(label);
		});
	});
});
