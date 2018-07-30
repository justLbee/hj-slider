'use strict';

const lowerSounds = [
	'./sounds/lower/first.mp3',
	'./sounds/lower/second.mp3',
	'./sounds/lower/third.mp3',
	'./sounds/lower/fourth.mp3',
	'./sounds/lower/fifth.mp3',
];

const middleSounds = [
	'./sounds/middle/first.mp3',
	'./sounds/middle/second.mp3',
	'./sounds/middle/third.mp3',
	'./sounds/middle/fourth.mp3',
	'./sounds/middle/fifth.mp3',
];

const higherSounds = [
	'./sounds/higher/first.mp3',
	'./sounds/higher/second.mp3',
	'./sounds/higher/third.mp3',
	'./sounds/higher/fourth.mp3',
	'./sounds/higher/fifth.mp3',
];

const pianoKeysArr = document.getElementsByTagName('audio');
const pianoButtonsArr = document.getElementsByTagName('li');
const piano = document.getElementsByTagName('ul')[0];

let shiftPressed = false;
let altPressed = false;

function toggleEvent(event) {
	if (event.shiftKey) {
		shiftPressed = true;
		piano.classList.remove('middle');
		piano.classList.add('lower');
	}

	if (event.altKey) {
		altPressed = true;
		piano.classList.remove('middle');
		piano.classList.add('higher');
	}
}

function keyUpEvent() {
	shiftPressed = false;
	altPressed = false;
	piano.classList.remove('higher');
	piano.classList.remove('lower');
	piano.classList.add('middle');
	middleSoundPlay();
}

function higherSoundPlay() {
	for (let sound = 0; sound < pianoKeysArr.length; sound++) {
		pianoKeysArr[sound].src = higherSounds[sound];
	}
}

function lowerSoundPlay() {
	for (let sound = 0; sound < pianoKeysArr.length; sound++) {
		pianoKeysArr[sound].src = lowerSounds[sound];
	}
}

function middleSoundPlay() {
	for (let sound = 0; sound < pianoKeysArr.length; sound++) {

		pianoKeysArr[sound].src = middleSounds[sound];
	}
}

document.addEventListener('keydown', toggleEvent);
document.addEventListener('keyup', keyUpEvent);

for (let key = 0; key < pianoKeysArr.length; key++) {
	pianoButtonsArr[key].addEventListener('click', () => {
		if(shiftPressed) {
			lowerSoundPlay();
		}

		if(altPressed) {
			higherSoundPlay();
		}
		pianoKeysArr[key].currentTime = 0;
		pianoKeysArr[key].play();
	});
}