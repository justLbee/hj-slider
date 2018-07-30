'use strict';

const player = document.getElementsByTagName('audio')[0];

const playerState = document.getElementsByClassName('mediaplayer')[0];
const btnPlay = document.getElementsByClassName('playstate')[0];
const btnStop = document.getElementsByClassName('stop')[0];
const btnBack = document.getElementsByClassName('back')[0];
const btnNext = document.getElementsByClassName('next')[0];

const title = document.getElementsByClassName('title')[0];

const tracksArr = [
	{
		url: './mp3/LA Chill Tour.mp3',
		title: 'LA Chill Tour'
	},
	{
		url: './mp3/LA Fusion Jam.mp3',
		title: 'LA Fusion Jam'
	},
	{
		url: './mp3./This is it band.mp3',
		title: 'This is it band'
	}
];

let playStatus = false;

function playerStateChange() {
	return playerState.classList.toggle('play');
}

btnPlay.onclick = function () {
	if (playerStateChange()) {
		playStatus = true;
		player.play();
	}
	else {
		player.pause();
		playStatus = false;
	}
};

btnStop.onclick = function () {
	player.pause();
	player.currentTime = 0;
	playStatus = false;

	if(playerStateChange()) {
		playerStateChange();
	}
};

let firstIndex = 0;
let lastIndex = tracksArr.length - 1;
let currIndex = 0;

btnNext.onclick = function () {
	currIndex++;

	if (currIndex > lastIndex) {
		currIndex = firstIndex;
	}

	player.src = tracksArr[currIndex].url;
	title.title = tracksArr[currIndex].title;

	if(playStatus) {
		player.play();
	}
};

btnBack.onclick = function () {
	currIndex--;

	if (currIndex < firstIndex) {
		currIndex = lastIndex;
	}

	player.src = tracksArr[currIndex].url;
	title.title = tracksArr[currIndex].title;

	if(playStatus) {
		player.play();
	}
};