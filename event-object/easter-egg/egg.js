'use strict';

const secretBox = document.getElementsByClassName('secret')[0];
const secretNav = document.getElementsByTagName('nav')[0];

let secretCode = [];
let secretCodeStr = '';

let symbolArr = [
	'KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyU', 'KeyB', 'KeyZ'
];

function passwordTry(event) {
	if(symbolArr.includes(event.code)) {
		secretCode.push(event.key);
	}

	secretCodeStr = secretCode.join('').toLowerCase();

	if(secretCodeStr.includes('нетология') || secretCodeStr.includes('ytnjkjubz')) {
		secretBox.classList.add('visible');
	}

	if(!event.ctrlKey) {
		return;
	}
	if (event.code ===  'KeyT') {
		secretNav.classList.toggle('visible');
	}
}

document.addEventListener('keydown', passwordTry);