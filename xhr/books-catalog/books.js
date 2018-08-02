'use strict';
const request = new XMLHttpRequest();
let booksObj, booksList, booksArgs;

request.addEventListener('load', onLoad);
request.open('GET', 'https://neto-api.herokuapp.com/book/', true);
request.send();

function init() {
	booksList = document.getElementById('content');
	booksList.innerHTML = '';

	for (let i = 0; i < booksObj.length; i++) {
		addElement(booksObj[i].cover.small);
	}

	booksArgs = document.querySelectorAll('#content > li');

	for (let i = 0; i < booksObj.length; i++) {
		booksArgs[i].dataset.title = booksObj[i].title;
		booksArgs[i].dataset.author = booksObj[i].author.name;
		booksArgs[i].dataset.info = booksObj[i].info;
		booksArgs[i].dataset.price = booksObj[i].price;
	}
}

function addElement(cover) {
	booksList.innerHTML += `<li><img src="${cover}"></li>`
}

function onLoad() {
	booksObj = JSON.parse(request.responseText);

	init();
}