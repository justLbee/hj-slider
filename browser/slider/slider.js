'use strict';

// import nikeAir from "./i/";

const slider = document.getElementById('slider');
const photosArr = [
	{
		id: 1,
		url: './i/airmax.png'
	},
	{
		id: 2,
		url: './i/airmax-jump.png'
	},
	{
		id: 3,
		url: './i/airmax-on-foot.png'
	},
	{
		id: 4,
		url: './i/airmax-playground.png'
	},
	{
		id: 5,
		url: './i/airmax-top-view.png'
	}
];

let currentIndex = 0;
let lastIndex = photosArr.length;

setTimeout(function changePhoto() {
	if (currentIndex === lastIndex) {
		currentIndex = 0;
	}
	slider.src = photosArr[currentIndex].url;
	currentIndex++;
	setTimeout(changePhoto, 5000);
}, 5000);