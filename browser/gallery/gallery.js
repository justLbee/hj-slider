'use strict';

const currentPhoto = document.getElementById('currentPhoto');
const nextPhoto = document.getElementById('nextPhoto');
const prevPhoto = document.getElementById('prevPhoto');

const photosArr = [
	{
		id: 1,
		url: './i/breuer-building.jpg'
	},
	{
		id: 2,
		url: './i/guggenheim-museum.jpg'
	},
	{
		id: 3,
		url: './i/headquarters.jpg'
	},
	{
		id: 4,
		url: './i/IAC.jpg'
	},
	{
		id: 5,
		url: './i/new-museum.jpg'
	}
];

let firstIndex = 0;
let lastIndex = photosArr.length - 1;
let currIndex = 0;

setTimeout(function() {
	currentPhoto.src = photosArr[firstIndex].url;
}, 1);

nextPhoto.onclick = function() {
	currIndex++;

	if(currIndex > lastIndex) {
		currIndex = firstIndex;
	}

	currentPhoto.src = photosArr[currIndex].url;
};

prevPhoto.onclick = function() {
	currIndex--;

	if(currIndex < firstIndex) {
		currIndex = lastIndex;
	}

	currentPhoto.src = photosArr[currIndex].url;
};


