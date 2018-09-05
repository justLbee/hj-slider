'use strict';

// const dragTextFile = document.querySelector('.text-editor__hint');
// const textEditor = document.getElementById('editor');
//
//
// textEditor.addEventListener('drop', loadFile);
// textEditor.addEventListener('dragover', event => {
// 	dragTextFile.classList.add('text-editor__hint_visible');
//
// 	event.preventDefault();
// });
//
// function loadFile(e) {
// 	event.preventDefault();
// 	dragTextFile.classList.remove('text-editor__hint_visible');
//
// 	const files = Array.from(event.dataTransfer.files);
// 	console.log(files);
// }

const fuck = new TextEditor(document.getElementById('editor'));

fuck.registerEvents = function () {
	this.container.addEventListener('drop', this.loadFile);
	this.container.addEventListener('dragover', this.showHint);
};

fuck.loadFile = function (e) {
	e.preventDefault();
	const file = Array.from(event.dataTransfer.files)[0];

	fuck.hideHint();
	fuck.readFile(file);
};

fuck.readFile = function (file) {
	const reader = new FileReader();
	let editorContent = this.contentContainer.value;

	reader.addEventListener('load', event => {
		editorContent += event.currentTarget.result.toString();

		this.contentContainer.value = editorContent;
		console.log(editorContent);

		console.log(this.filenameContainer.textContent);

		fuck.setFilename(file.name);
	});

	reader.readAsText(file);
};

fuck.setFilename = function (name) {
	this.filenameContainer.textContent = name;
};

fuck.showHint = function (e) {
	e.preventDefault();
	const hint = this.querySelector( '.text-editor__hint' );

	hint.classList.add('text-editor__hint_visible');
};


fuck.hideHint = function () {
	this.hintContainer.classList.remove('text-editor__hint_visible');
};

fuck.registerEvents();