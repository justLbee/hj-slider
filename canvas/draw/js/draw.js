'use strict';

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

let drawing = false;
let brushSize = changeBrushSize();
let hue = changeHue();

function changeBrushSize() {
	const minBrush = 5;
	const maxBrush = 100;
	let currentBrush = maxBrush;
	let isRising = true;

	return function () {
		if (currentBrush < maxBrush && isRising) {
			return currentBrush++;
		}
		else {
			isRising = false;
		}

		if (currentBrush > minBrush && !isRising) {
			return currentBrush--;
		}
		else {
			isRising = true;
		}
	}
}

function changeHue(isShiftKey) {
	let val = 0;
	const maxHue = 359;

	return function () {
		if (isShiftKey) {
			return val < 359 ? val++ : val = 0;
		}
		else {
			return val === 0 ? val = maxHue : val--;
		}
	}
}

function draw(event) {
	if (event.buttons === 1 && drawing) {
		ctx.beginPath();
		ctx.fillStyle = `hsl(${hue(event.shiftKey)}, 100%, 50%`;
		ctx.arc(event.offsetX, event.offsetY, brushSize(), 0, 2*Math.PI);
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.fill();
	}
}

function init() {
	let canvasWidth = window.innerWidth;
	let canvasHeight = window.innerHeight;
	ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	canvas.height = innerHeight;
	canvas.width = innerWidth;
}

init();

window.addEventListener('resize', init);
canvas.addEventListener('mousedown', () => {
	drawing = true;
});
canvas.addEventListener('mouseleave', () => {
	drawing = false;
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('dblclick', init);


