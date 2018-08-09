'use strict';

const inputs = document.getElementsByTagName('input');

let ready = 0;

function init() {
	Array.from(inputs).forEach(input => {
		if(input.checked){
			ready++;
		}
		input.addEventListener('click', checkStatus);
	});
	completeness();
}

function checkStatus() {
	const list = document.getElementsByClassName('list-block')[0];

	this.checked ? ready++ : ready --;
	ready === inputs.length ? list.classList.add('complete') : list.classList.remove('complete');

	completeness();
}

function completeness() {
	const output = document.getElementsByTagName('output')[0];

	output.textContent = `${ready} из ${inputs.length}`
}

document.addEventListener('DOMContentLoaded', init);
