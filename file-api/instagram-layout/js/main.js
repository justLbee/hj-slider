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
	this.positionsContainer.addEventListener('drop', instagramLayout.loadFile);
	this.positionsContainer.addEventListener('dragover', instagramLayout.showHint);
	this.positionsContainer.addEventListener('dragleave', e => {
		e.preventDefault();
		e.target.classList.remove('layout__item_active');
	});

	this.actionButton.addEventListener('click', instagramLayout.generateHTML)
};

instagramLayout.loadFile = function (event) {
	event.preventDefault();
	event.target.classList.remove('layout__item_active');
	const file = Array.from(event.dataTransfer.files);

	let position = event.target.classList[1].split('_').pop();
	let canvasPosition = event.target.classList[1];

	instagramLayout.layout[position] = {
		width: event.target.offsetWidth,
		height: event.target.offsetHeight
	};

	instagramLayout.updateImageData(file, canvasPosition, position);
};

instagramLayout.showHint = function (event) {
	event.preventDefault();

	event.target.classList.add('layout__item_active');
};

instagramLayout.updateImageData = function (file, canvasPosition, position) {
	// Создаем изображения из файла
	Array.from(file).forEach(file => {
		const fileType = /^image\//;
		try {
			if(!fileType.test(file.type)) {
				throw new Error ('Неверный формат файла');
			}

			const imgElement = this.container.querySelector(`.${canvasPosition}`);

			const img = document.createElement('img');
			imgElement.appendChild(img);
			img.classList.add('layout__image');

			img.src = URL.createObjectURL(file);
		}catch (e) {
			console.log(e.message);
			return;
		}

	});
};

instagramLayout.generateHTML = function () {
	const topImg = document.querySelector('.layout__item_top img');
	const leftImg = document.querySelector('.layout__item_left img');
	const bottomImg = document.querySelector('.layout__item_bottom img');

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = instagramLayout.layout.left.width + instagramLayout.layout.top.width;
	canvas.height = instagramLayout.layout.left.height;

	if(topImg && bottomImg && leftImg) {
		ctx.drawImage(leftImg, 0, 0);
		ctx.drawImage(topImg, instagramLayout.layout.left.width, 0);
		ctx.drawImage(bottomImg, instagramLayout.layout.left.width, instagramLayout.layout.top.height);
	}

	const img = document.createElement('img');

	img.src = canvas.toDataURL();

	instagramLayout.result.textContent = img.outerHTML;

	console.log(img.outerHTML);
};


instagramLayout.registerEvents();