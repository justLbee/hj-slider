'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

editor.addEventListener('update', event => {
	ws.send(event);
	// console.log(event);
});

ws.addEventListener('message', event => {
	// console.log(event);
});