'use strict';

function init() {
	const contentForm = document.getElementsByClassName('contentform')[0];
	const buttonConfirm = document.querySelector('form > button');
	const buttonEdit = document.querySelector('main > button');
	const inputs = document.querySelectorAll('form input');
	const textArea = document.getElementsByTagName('textarea')[0];
	const confirmedWindow = document.getElementById('output');
	const confirmedWindowOutputs = document.getElementsByTagName('output');

	let dataObj = {};

	Array.from(inputs).forEach(input => {
		console.log(input);
		input.addEventListener('input', getValue);
	});

	textArea.addEventListener('input', getValue);

	function getValue() {
		if (this.name === 'zip') {
			this.value = this.value.replace(',', '.');
			if (!/^\.?$/.test(this.value) && !isFinite(this.value)) {
				this.value = parseFloat(this.value) || this.value.slice(0, -1);
			}
		}

		dataObj[this.name] = this.value;

		if (this.value === '') {
			delete dataObj[this.name];
		}

		buttonConfirm.disabled = true;

		(Object.keys(dataObj).length === (inputs.length + 1)) ? buttonConfirm.disabled = false : buttonConfirm.disabled = true;
	}

	buttonConfirm.addEventListener('click', () => {
		event.preventDefault();
		contentForm.classList.add('hidden');
		confirmedWindow.classList.remove('hidden');

		Array.from(confirmedWindowOutputs).forEach(element => {
			if(dataObj.hasOwnProperty(element.id)) {
				element.textContent = dataObj[element.id];
			}
		})
	});

	buttonEdit.addEventListener('click', () => {
		event.preventDefault();
		contentForm.classList.remove('hidden');
		confirmedWindow.classList.add('hidden');
	})
}

document.addEventListener('DOMContentLoaded', init);