const prop = (data, name) => data.map(item => item[name]),
	summ = data => data.reduce((total, value) => total + value, 0);

class SpriteGenerator {
	constructor(container) {
		this.uploadButton = container.querySelector('.sprite-generator__upload');

		this.submitButton = container.querySelector('.sprite-generator__generate');
		this.imagesCountContainer = container.querySelector('.images__added-count-value');
		this.codeContainer = container.querySelector('.sprite-generator__code');
		this.imageElement = container.querySelector('.sprite-generator__result-image');
		this.images = [];

		this.imagesCount = 0;

		this.registerEvents();
	}

	registerEvents() {
	}
}

new SpriteGenerator(document.getElementById('generator'));

const spriteGen = new SpriteGenerator(document.getElementById('generator'));
spriteGen.registerEvents = function () {
	this.uploadButton.addEventListener('change', this.uploadFiles);
	this.submitButton.addEventListener('click', this.generateSprite);
};

// Получаем файлы изображений
spriteGen.uploadFiles = function (event) {
	const files = Array.from(event.currentTarget.files);

	spriteGen.updateFilesInfo(files);
};
// Записываем информацию о файлах
spriteGen.updateFilesInfo = function (files) {
	// Регулярное выражение для отсечения расширения в имени
	const nameRegExp = /(\.png)||(\.img)/gi;
	const fileType = /^image\//;

	files.forEach(file => {
		const img = document.createElement('img');

		try {
			if(!fileType.test(file.type)) {
				console.log();
				throw new Error ('Неверный формат файла');
			}

			// Создаем изображения из файла
			img.src = URL.createObjectURL(file);
			// Убираем расширение
			img.name = file.name.replace(nameRegExp, '');

			// Записываем в массив изображений
			this.images.push(img);

			img.addEventListener('load', event => {
				URL.revokeObjectURL(event.currentTarget.src);
			});
		}catch (e) {
			console.log(e.message);
			return;
		}
	});
};
// Создаем пустой массив объектов, для добавления css кода

spriteGen.generateSprite = function (event) {
	// Создаем canvas
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	let canvasSize = {
		width: 0,
		height: 0
	};

	spriteGen.imagesCount = 0;
	const cssCodeArr = [];

	// Проход по массиву с изображениями
	spriteGen.images.forEach((image, index) => {
		// Создание и заполнения объекта с информацией об изображении
		let cssCodeObj = {};

		cssCodeObj.className = `.${image.name}`;
		cssCodeObj.backgroundPosition = `${nextImage(canvasSize.width, index).x}px ${nextImage(canvasSize.width).y}px`;
		cssCodeObj.width = `${image.width}px`;
		cssCodeObj.height = `${image.height}px`;

		//Добавление объекта с информацией в массив для css кода
		cssCodeArr.push(cssCodeObj);

		ctx.beginPath();

		// Отрисовка изображений в канвас
		ctx.drawImage(image, nextImage(canvasSize.width, index).x, nextImage(canvasSize.width).y);

		canvasSize.width += image.width;
		canvasSize.height += image.height;
		spriteGen.imagesCount++;
	});

	// Вывод канвас в тег с изображением
	spriteGen.imageElement.src = canvas.toDataURL();

	spriteGen.imagesCountContainer.textContent = spriteGen.imagesCount;

	spriteGen.generateCss(cssCodeArr);
};

// генерация и заполнение окна css кодом
spriteGen.generateCss = function (cssArr) {
	let css = `.icon {
		display: inline-block;
		background-image: url(img/sprite.png);
		}`;
	cssArr.forEach(cssClass => {
		css += `\n${cssClass.className} {
		background-position: ${cssClass.backgroundPosition};
  		width: ${cssClass.width};
  		height: ${cssClass.height};
		}`;
	});

	this.codeContainer.textContent = css;

};

// Определение положения следующего изображения на канвасе
function nextImage(width, index) {
	return index === 0 ? {x: 0, y: 0} : {x: 0 + width, y: 0};
}

spriteGen.registerEvents();
