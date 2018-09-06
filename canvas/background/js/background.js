'use strict';

const canvas = document.getElementById('wall');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext('2d');
let objectsArr = [];
let count = randomInt(50, 200);

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function sizeCount(min, max) {
	return Math.random() * (max - min) + min
}

function createObjects() {
	objectsArr.push({
		func: randomInt(0, 2),
		size: sizeCount(0.1, 0.6),
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height
	})
}

function draw(obj, index) {
	let coordinate = {};

	function nextPoint(x, y, time) {
		return {
			x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
			y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
		};
	}

	function upNextPoint(x, y, time) {
		return {
			x: x + Math.sin((x + (time / 10)) / 100) * 5,
			y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
		};
	}

	ctx.lineWidth = 5 * obj.size;
	ctx.strokeStyle = 'white';

	if (obj.func === 0) {
		coordinate = nextPoint(obj.x, obj.y, Date.now());
	}
	else {
		coordinate = upNextPoint(obj.x, obj.y, Date.now());
	}
	ctx.beginPath();

	if ((index % 2) === 0) {
		ctx.arc(coordinate.x, coordinate.y, 12 * obj.size, 0, 2* Math.PI, false);
		ctx.stroke();
		ctx.closePath();
	}
	else {
		let randAngle = randomInt(0, 360);
		ctx.translate(coordinate.x, coordinate.y);
		ctx.rotate(randAngle);
		ctx.moveTo( -10 * obj.size, 0);
		ctx.lineTo(10 * obj.size, 0);
		ctx.moveTo(0, 10 * obj.size);
		ctx.lineTo(0, -10 * obj.size);
		ctx.stroke();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	}
}

for (let i = 0; i < count; i++) {
	createObjects();
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	objectsArr.forEach((object, index) => {
		draw(object, index);
	});

	window.requestAnimationFrame(animate)
}

animate();