'use strict';

const connectionsAmount = document.querySelector('.counter');
const errorsAmount = document.querySelector('.errors');

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('open', () => {

});

connection.addEventListener('message', event => {
	const msgData = JSON.parse(event.data);


	connectionsAmount.textContent = msgData.connections;
	errorsAmount.textContent = msgData.errors;
});

window.addEventListener('beforeunload', () => {
	connection.close(1000, 'work finished');
});