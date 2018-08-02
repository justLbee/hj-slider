'use strict';
const request = new XMLHttpRequest();
request.addEventListener('loadstart', onLoadStart);
request.addEventListener("loadend", onLoadEnd);

let links = document.getElementsByTagName('a');
let preloader;


function init() {
	preloader = document.getElementById('preloader');

	let email = document.getElementsByClassName('active')[0];
	onLinkClick(email.href);

	for(let i = 0; i < links.length; i++) {
		links[i].addEventListener('click', onLinkClick);
	}
}

function onLinkClick(href) {
	event.preventDefault();

	if(href === event) {

		href = event.srcElement.href;

		Array.from(links).forEach(link => link.classList.remove('active'));
		event.srcElement.classList.add('active');
	}

	request.addEventListener('load', onLoad);
	request.open('GET', href, true);
	request.send();
}

function onLoad() {
	document.getElementById('content').innerHTML = request.responseText;
}

function onLoadStart() {
	preloader.classList.remove('hidden');
}

function onLoadEnd() {
	preloader.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', init);

