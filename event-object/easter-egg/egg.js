'use strict';

const secretBox = document.getElementsByClassName('secret')[0];
const secretNav = document.getElementsByTagName('nav')[0];

let secretCode = [];
let secretCodeStr = '';

function passwordTry(event) {
	secretCode.push(event.key);

	secretCodeStr = secretCode.join('');

	if(secretCodeStr.includes('нетология')) {
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