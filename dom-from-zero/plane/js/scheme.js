'use strict';

const planeName = document.getElementById('acSelect');
const btnSeat = document.getElementById('btnSeatMap');
const seatMapDiv = document.getElementById('seatMapDiv');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');

// Кнопка заполнить
function checkAllSeats(type) {
	const seatArr = seatMapDiv.querySelectorAll('.seat');

	//Проверка по каждому сидению
	Array.from(seatArr).forEach(seat => {
		seat.classList.remove('adult', 'half');

		if(type === 'add') {
			seat.classList.add('adult');
		}
	});

	//Подсчет мест
	countSeats(seatArr);
}

// Удаление самолета
function clearPlane() {
	while (seatMapDiv.firstChild) {
		seatMapDiv.removeChild(seatMapDiv.firstChild)
	}
}

// Создание нового самолета по данным из запроса
function createPlane(params) {
	document.getElementById('seatMapTitle').textContent = `${params.title} (${params.passengers} пассажира)`;
	btnSetEmpty.removeAttribute('disabled');
	btnSetFull.removeAttribute('disabled');

	for (let i in params.scheme) {
		const block = jsTemplate(i, params);
		seatMapDiv.appendChild(engine(block));
	}

	const seats = document.querySelectorAll('div .seat');
	Array.from(seats).forEach(seat => {
		seat.addEventListener('click', (event) => {
			const target = event.currentTarget;

			if(target.classList.contains('adult') || target.classList.contains('half')) {
				target.classList.remove('adult', 'half');
			}
			else {
				if(!event.altKey) {
					target.classList.add('adult');
				}
				else {
					target.classList.add('half');
				}
			}

			countSeats(seats);
		})
	})
}

// Подсчет сидений
function countSeats(seats) {
	let adult = 0;
	let half = 0;

	Array.from(seats).forEach(seat => {
		if(seat.classList.contains('adult')) {
			adult++;
		}
		if(seat.classList.contains('half')) {
			half++;
		}
	});

	totalPax.textContent = adult + half;
	totalAdult.textContent = adult;
	totalHalf.textContent = half;
}

// Шаблон разметки
function jsTemplate(index, params) {
	let letters = params.scheme[index] === 4 ? [].concat('', params.letters4, '') : ((params.scheme[index] === 6) ? params.letters6 : []);
	const rowNumber = ++index;

	return {
		tag : 'div',
		cls : ['row', 'seating-row', 'text-center'],
		content : [
			{
				tag : 'div',
				cls : ['col-xs-1', 'row-number'],
				content : {
					tag : 'h2',
					cls : '',
					content : rowNumber
				}
			},
			{
				tag : 'div',
				cls : 'col-xs-5',
				content : [
					{
						tag : 'div',
						cls : ['col-xs-4', (!letters[0] ? 'no-seat' : 'seat')],
						content : {
							tag : 'span',
							cls : 'seat-label',
							content : letters[0]
						}
					},
					{
						tag : 'div',
						cls : ['col-xs-4', (!letters[1] ? 'no-seat' : 'seat')],
						content : {
							tag : 'span',
							cls : 'seat-label',
							content : letters[1]
						}
					},
					{
						tag : 'div',
						cls : ['col-xs-4', (!letters[2] ? 'no-seat' : 'seat')],
						content : {
							tag : 'span',
							cls : 'seat-label',
							content : letters[2]
						}
					}
				]
			},
			{
				tag : 'div',
				cls : 'col-xs-5',
				content : [
					{
						tag : 'div',
						cls : ['col-xs-4', (!letters[3] ? 'no-seat' : 'seat')],
						content : {
							tag : 'span',
							cls : 'seat-label',
							content : letters[3]
						}
					},
					{
						tag : 'div',
						cls : ['col-xs-4', (!letters[4] ? 'no-seat' : 'seat')],
						content : {
							tag : 'span',
							cls : 'seat-label',
							content : letters[4]
						}
					},
					{
						tag : 'div',
						cls : ['col-xs-4', (!letters[5] ? 'no-seat' : 'seat')],
						content : {
							tag : 'span',
							cls : 'seat-label',
							content : letters[5]
						}
					}
				]
			}
		]
	}
}

// Чтение разметки
function engine(block) {
	if ((block === undefined) || (block === null) || (block === false)) {
		return document.createTextNode('');
	}

	if ((typeof block === 'string') || (typeof block === 'number') || (typeof block === true)) {
		return document.createTextNode(block)
	}

	if(Array.isArray(block)) {
		return block.reduce(function(f, item) {
			f.appendChild(engine(item));
			return f;
		}, document.createDocumentFragment(block.tag))
	}

	const element = document.createElement(block.tag || 'div');
	element.classList.add(...[].concat(block.cls || []));
	if (block.attrs) {
		Object.keys(block.attrs).forEach(key => {
			element.setAttribute(key, block.attrs[key])
		})
	}

	if (block.content) {
		element.appendChild(engine(block.content))
	}

	return element
}

// Параметры запроса
function sendRequest(url, method, bodyStr = null) {
	const body = method === 'POST' ? bodyStr : null;
	const requestParams = {
		credentials: 'same-origin',
		method,
		body
	};

	return fetch(url, requestParams).then(
		(result) => result.json(),
		(error) => {
			throw new Error(error);
		}
	)
}

btnSetFull.addEventListener('click', (e) => {
	e.preventDefault();
	checkAllSeats('add');
});

btnSetEmpty.addEventListener('click', (e) => {
	e.preventDefault();
	checkAllSeats('remove');
});

btnSeat.addEventListener('click', (e) => {
	e.preventDefault();
	clearPlane();
	init();
	sendRequest(`https://neto-api.herokuapp.com/plane/${planeName.value}`, 'GET')
		.then((result) => createPlane(result))
});

init();

function init() {
	btnSetEmpty.setAttribute('disabled', 'disabled');
	btnSetFull.setAttribute('disabled', 'disabled');
	totalPax.textContent = 0;
	totalAdult.textContent = 0;
	totalHalf.textContent = 0;
}