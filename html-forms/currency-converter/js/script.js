'use strict';
const request = new XMLHttpRequest;

function init() {
	const loader = document.getElementById('loader');
	const content = document.getElementById('content');
	const selectFrom = document.getElementById('from');
	const selectTo = document.getElementById('to');
	const source = document.getElementById('source');
	const output = document.getElementById('result');
	let currencyObj;

	request.addEventListener('loadstart', onLoadStart);
	request.addEventListener('loadend', onLoadFinish);

	request.open('GET', 'https://neto-api.herokuapp.com/currency', true);
	request.send();

	function onLoadStart() {
		loader.classList.remove('hidden');
		content.classList.add('hidden');
	}

	function onLoadFinish() {
		currencyObj = JSON.parse(request.responseText);
		console.log(currencyObj);
		loader.classList.add('hidden');
		content.classList.remove('hidden');

		currencyObj.forEach(currency => {
			let option = `<option value="${currency.value}">${currency.code}</option>`;

			selectFrom.innerHTML += option;
			selectTo.innerHTML += option;
		});

		calculateCurr(selectFrom.value, selectTo.value);
	}

	selectFrom.addEventListener('change', () => {
		calculateCurr(selectFrom.value, selectTo.value);
	});

	selectTo.addEventListener('change', () => {
		calculateCurr(selectFrom.value, selectTo.value);
	});

	source.addEventListener('input', () => {
		calculateCurr(selectFrom.value, selectTo.value);
	});

	function calculateCurr(from = selectFrom.value, to = selectTo.value) {
		let summary = Number(Math.round((source.value * from / to)+'e'+2)+'e-'+2).toFixed(2);

		output.textContent = summary;
	}
}

document.addEventListener('DOMContentLoaded', init);