'use strict';

// Создаем экземпляр класса
const editorExemplar = new TextEditor(document.getElementById('editor'));

// Слушатели событий переноса файлов
editorExemplar.registerEvents = function () {
	this.container.addEventListener('drop', this.loadFile);
	this.container.addEventListener('dragover', this.showHint);
};


// Описываем работу каждой из необходимых функций
// Переновс файла drag adn drop
editorExemplar.loadFile = function (e) {
	e.preventDefault();
	const file = Array.from(event.dataTransfer.files)[0];

	editorExemplar.hideHint();
	editorExemplar.readFile(file);
};

// Читаем файл, отсекаем не текст, выводим содержимое файла в окно редактора, сохраняем в локальное хранилище
editorExemplar.readFile = function (file) {
	const reader = new FileReader();
	const fileTypeRegExp = /^text\//;
	let editorContent = this.contentContainer.value;

	try {
		if(!fileTypeRegExp.test(file.type)) {
			console.log();
			throw new Error ('Неверный формат файла');
		}
	}catch (e) {
		console.log(e.message);
		return;
	}

	reader.addEventListener('load', event => {
		editorContent += event.currentTarget.result.toString();

		this.contentContainer.value = editorContent;

		editorExemplar.setFilename(file.name);
	});

	reader.readAsText(file);

	this.save();
};

// Меняем название файла в шапке
editorExemplar.setFilename = function (name) {
	this.filenameContainer.textContent = name;
};

// Показываем подсказку при наведении файла в окно редактора
editorExemplar.showHint = function (e) {
	e.preventDefault();
	const hint = this.querySelector( '.text-editor__hint' );

	hint.classList.add('text-editor__hint_visible');
};

// Прячем подсказку после добавления файла
editorExemplar.hideHint = function () {
	this.hintContainer.classList.remove('text-editor__hint_visible');
};

editorExemplar.registerEvents();