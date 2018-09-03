'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

function sendDraw(event) {
	event.canvas.toBlob(blob => ws.send(blob));
}

ws.addEventListener('open', () => {
	editor.addEventListener('update', sendDraw);
});

ws.addEventListener('close', () => {
	editor.removeEventListener('update', sendDraw);
});

window.addEventListener('beforeunload', () => {
	ws.close(1000, 'Сессия закрыта');
});