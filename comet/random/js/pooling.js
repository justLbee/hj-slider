'use strict';
const cardsPooling = Array.from(document.querySelectorAll('.pooling div'));

function loadNumber(event) {
	if (event.target.status === 200) {
		const response = event.target.responseText;

		cardsPooling.forEach(card => {
			card.textContent === response ? card.classList.add('flip-it') : card.removeAttribute('class');
		});
	}
}

function init() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
	xhr.addEventListener('load', loadNumber);
	xhr.send();
}

setInterval(init, 5000);