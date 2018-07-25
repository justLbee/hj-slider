'use strict';

let drumMachine = document.getElementsByTagName('audio');
let drumButtons = document.getElementsByClassName('drum-kit__drum');

for (let btn = 0; btn < drumButtons.length; btn++) {
	drumButtons[btn].onclick = function () {
		drumMachine[btn].play();
	}
}