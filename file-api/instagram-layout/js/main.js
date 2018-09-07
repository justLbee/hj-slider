const addClass = (className, context) => context.classList.add(className),
	removeClass = (className, context) => context.classList.remove(className),
	hasClass = (className, context) => context.classList.contains(className);

class iLayout {
	constructor(container) {
		this.container = container;
		this.positionsContainer = container.querySelector('.layout__positions');
		this.actionButton = container.querySelector('.layout__button');
		this.result = container.querySelector('.layout__result');
		this.layout = {
			left: null,
			top: null,
			bottom: null
		};
		this.registerEvents();
	}

	registerEvents() {
	}
}

new iLayout(document.getElementById('layout'));

const instagramLayout = new iLayout(document.getElementById('layout'));

instagramLayout.registerEvents = function () {
	console.log(this.container);
	// const layout = this.container.getElementById('layout');
	this.positionsContainer.addEventListener('drop', instagramLayout.loadFile);
	this.positionsContainer.addEventListener('dragover', instagramLayout.showHint);
};

instagramLayout.loadFile = function (event) {
	event.preventDefault();
	const file = Array.from(event.dataTransfer.files);

	let position = event.target.classList[1].split('_').pop();
	let canvasPosition = event.target.classList[1];

	instagramLayout.updateImageData(position, file, canvasPosition);
	instagramLayout.drawImage(position, canvasPosition);
	//
	// instagramLayout.layout[position] = ;
	// console.log(instagramLayout.layout);
};

instagramLayout.showHint = function (event) {
	event.preventDefault();
};

instagramLayout.updateImageData = function (position, file, canvasPosition) {
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	const imgElement = this.container.querySelector(`.${canvasPosition}`);

	const img = document.createElement('img');

	// Создаем изображения из файла
	Array.from(file).forEach(file => {
		img.src = URL.createObjectURL(file);
		this.layout[position] = img.src;

		const pattern = ctx.createPattern(img.src, 'no-repeat');
		ctx.beginPath();

		ctx.fillStyle = pattern;
		ctx.drawImage(img.src, 0, 0);
	});


	// Отрисовка изображений в канвас

	imgElement.appendChild(img).src = canvas.toDataURL();
};

instagramLayout.drawImage = function (position, canvasPosition) {
	// const canvas = document.createElement('canvas');
	// const ctx = canvas.getContext('2d');
	// const imgElement = this.container.querySelector(`.${canvasPosition}`);
	//
	//
	// const pattern = ctx.createPattern(this.layout[position], 'no-repeat');
	//
	// ctx.beginPath();
	//
	// // Отрисовка изображений в канвас
	// ctx.fillStyle = pattern;
	// ctx.drawImage(this.layout[position], 0, 0);
	//
	//
	// imgElement.src = canvas.toDataURL();
};


instagramLayout.registerEvents();