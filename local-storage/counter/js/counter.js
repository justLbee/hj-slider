'use strict';

function init(number) {
	console.log(number);
	const buttons = document.querySelector('.wrap-btns');
	const counter = document.getElementById('counter');
	let jsCounter;

	number ? jsCounter = number : jsCounter = 0;

	counter.innerText = jsCounter;

	buttons.addEventListener('click', clickButton);

	function clickButton(event) {
		if(event.target.id === 'increment') {
			jsCounter++
		}
		if(event.target.id === 'decrement'){
			jsCounter--
		}
		if(event.target.id === 'reset') {
			jsCounter = 0;
		}

		counter.innerText = jsCounter;

		localStorageSave();
	}

	function localStorageSave() {
		localStorage.counter = `${jsCounter}`
	}
}

document.addEventListener('DOMContentLoaded', init(localStorage.counter));