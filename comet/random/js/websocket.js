'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const cardsWs = Array.from(document.querySelectorAll('.websocket div'));

ws.addEventListener('open', () => {

});

ws.addEventListener('message', event => {
	cardsWs.forEach(card => {
		card.textContent === event.data ? card.classList.add('flip-it') : card.removeAttribute('class');
	});
});

ws.addEventListener('close', () => {
	editor.removeEventListener('update', sendDraw);
});

window.addEventListener('beforeunload', () => {
	ws.close(1000, 'Сессия закрыта');
});
