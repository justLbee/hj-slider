'use strict';

// Получения канваса из верстки
const canvas = document.getElementById('wall');
let ctx = canvas.getContext('2d');

// Задание разрешения канвас объекта
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let objectsArr = [];
let count = randomInt(50, 200);

// Функция для получения целого случайного числа в интервале [min, max]
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Функция для получения случайного числа в интервале [min, max]
function sizeCount(min, max) {
	return Math.random() * (max - min) + min
}

// Создание объектов случайных размеров
function createObjects() {
	objectsArr.push({
		func: randomInt(0, 2), 								// Случайное число для выбора функции времени
		size: sizeCount(0.1, 0.6),						// Размер
		x: Math.random() * canvas.width,			// Координата х
		y: Math.random() * canvas.height			// Координата у
	})
}

// Отрисовка объектов
function draw(obj, index) {
	let coordinate = {};

	// Функия времени 1
	function nextPoint(x, y, time) {
		return {
			x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
			y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
		};
	}

	// Функия времени 2
	function upNextPoint(x, y, time) {
		return {
			x: x + Math.sin((x + (time / 10)) / 100) * 5,
			y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
		};
	}

	// Толщина линий и цвет обводки
	ctx.lineWidth = 5 * obj.size;
	ctx.strokeStyle = 'white';

	// Определение какая именно функция времени будет использоваться для объекта
	if (obj.func === 0) {
		coordinate = nextPoint(obj.x, obj.y, Date.now());
	}
	else {
		coordinate = upNextPoint(obj.x, obj.y, Date.now());
	}

	// Начало отрисовки самого объекта
	ctx.beginPath();

	// Каждый четный объект - кружок, нечетный - крестик
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

// Создание самих объектов в количестве от 50 до 200
for (let i = 0; i < count; i++) {
	createObjects();
}

// Очистка канваса отрисовка объектов и запуск анимации
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	objectsArr.forEach((object, index) => {
		draw(object, index);
	});

	window.requestAnimationFrame(animate)
}

animate();