'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connection.addEventListener('open', showBubbles(connection));

connection.addEventListener('error', error => {
	console.log(`Произошла ошибка: ${error.data}`);
});

document.addEventListener("click", getClickInfo);

function getClickInfo() {
	const mouseInfo = {
		x: event.x,
		y: event.y
	};
	console.log(JSON.stringify(event.x));
	connection.send(JSON.stringify(mouseInfo));
}

window.addEventListener('beforeunload', () => {
	connection.onclose = function() {};
	connection.close();
});