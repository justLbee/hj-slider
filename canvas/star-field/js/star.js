'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const colorList = ['#ffffff', '#ffe9c4', '#d4fbff'];

function draw() {
	canvas.style.background = '#000';

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	const starsAmount = randomizer(200, 400);

	for (let i = 1; i < starsAmount; i++ ) {
		const x = Math.round(Math.random() * canvas.width);
		const y = Math.round(Math.random() * canvas.height);
		star(x, y);
	}
}

function star(x, y) {
	const starSize = randomizer(0, 1.1, true);
	const starBrightness = randomizer(0.8, 1, true);
	const starColor = colorList[randomizer(0, 2)];

	ctx.beginPath();
	ctx.globalAlpha = starBrightness;
	ctx.fillStyle = starColor;
	ctx.fillRect(x, y, starSize, starSize);
	ctx.closePath();
}

function randomizer(min, max, float = false) {
	return float ? (min + (Math.random() * (max - min))).toFixed(1) : Math.floor(min + Math.random() * (max + 1 - min));
}

draw();

canvas.addEventListener('click', draw);