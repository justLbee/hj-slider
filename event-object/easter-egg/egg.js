'use strict';

const secretBox = document.getElementsByClassName('secret')[0];
const secretNav = document.getElementsByTagName('nav')[0];

let secretCode = [];
let secretCodeStr = '';

function passwordTry(event) {
	// secretCode.push(event.key);
	// console.log(event.code);

	// secretCodeStr = secretCode.join('');

	switch(event.code) {
		case 'KeyY':
			secretCode.push(event.key);
			break;
		case 'KeyT':
			secretCode.push(event.key);
			break;
		case 'KeyN':
			secretCode.push(event.key);
			break;
		case 'KeyJ':
			secretCode.push(event.key);
			break;
		case 'KeyK':
			secretCode.push(event.key);
			break;
		case 'KeyU':
			secretCode.push(event.key);
			break;
		case 'KeyB':
			secretCode.push(event.key);
			break;
		case 'KeyZ':
			secretCode.push(event.key);
			break;
	}

	secretCodeStr = secretCode.join('').toLowerCase();

	if(secretCodeStr.includes('нетология') || secretCodeStr.includes('ytnjkjubz')) {
		secretBox.classList.add('visible');
	}

	if(!event.ctrlKey) {
		return;
	}
	switch (event.code) {
		case 'KeyT':
			secretNav.classList.toggle('visible');
	}
}

document.addEventListener('keydown', passwordTry);