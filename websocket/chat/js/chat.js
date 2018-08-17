'use strict';

const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('.chat-status');
const sendButton = chat.querySelector('.message-submit');
const popUpOnline = chat.querySelector('.message-status > .message-text').cloneNode(true);
const popUpLoading = chat.querySelector('.loading').cloneNode(true);
const messageSent = chat.querySelector('.message-personal').cloneNode(true);
const messageReceived = chat.querySelector('.messages-templates div:nth-child(2)').cloneNode(true);
const contentMessages = chat.querySelector('.messages-content');
const messageData = chat.querySelector('.message-input');

const socketConnection = new WebSocket('wss://neto-api.herokuapp.com/chat');

sendButton.addEventListener('click', sendMessage);
window.addEventListener('keydown', event => {
	if(event.keyCode === 13) {
		sendMessage();
	}
});

socketConnection.addEventListener('open', () => {
	console.log('Соединение открыто');

	chatStatus.textContent = chatStatus.dataset.online;
	sendButton.disabled = false;
	popUpOnline.textContent = 'Пользователь появился в сети';
	contentMessages.appendChild(popUpOnline);
});

socketConnection.addEventListener('message', event => {
	if(event.data === '...') {
		contentMessages.appendChild(popUpLoading);
	}
	updateMessageWindow(event.data, true)
	//
	// const msgText = messageReceived.querySelector('.message-text');
	// const msgTime = messageReceived.querySelector('.timestamp');
	// let time = new Date();
	// let options = {
	// 	hour: 'numeric',
	// 	minute: 'numeric',
	// };
	//
	// msgText.textContent = event.data;
	// msgTime.textContent = time.toLocaleTimeString('ru', options);
	//
	// contentMessages.appendChild(messageReceived);
});

function sendMessage() {
	event.preventDefault();

	console.log(messageData.value);
	socketConnection.send(messageData.value);

	updateMessageWindow(messageData.value, false);

	// const msgText = messageSent.querySelector('.message-text');
	// const msgTime = messageSent.querySelector('.timestamp');
	// let time = new Date();
	// let options = {
	// 	hour: 'numeric',
	// 	minute: 'numeric',
	// };
	//
	// msgText.textContent = messageData.value;
	// msgTime.textContent = time.toLocaleTimeString('ru', options);
	//
	// contentMessages.appendChild(messageSent);
}

function updateMessageWindow(message, received) {
	let time = new Date();
	let options = {
		hour: 'numeric',
		minute: 'numeric',
	};

	if(received) {
		const msgTextReceived = messageReceived.querySelector('.message-text');
		const msgTimeReceived = messageReceived.querySelector('.timestamp');

		msgTextReceived.textContent = event.data;
		msgTimeReceived.textContent = time.toLocaleTimeString('ru', options);

		contentMessages.appendChild(messageReceived);
	}
	else {
		const msgTextSent = messageSent.querySelector('.message-text');
		const msgTimeSent = messageSent.querySelector('.timestamp');

		msgTextSent.textContent = messageData.value;
		msgTimeSent.textContent = time.toLocaleTimeString('ru', options);

		contentMessages.appendChild(messageSent);
	}
}

socketConnection.addEventListener('close', () => {
	chatStatus.textContent = chatStatus.dataset.offline;
	sendButton.disabled = true;
	popUpOnline.textContent = 'Пользователь не сети';
	contentMessages.appendChild(popUpOnline);
});

window.addEventListener('beforeunload', () => {
	socketConnection.close(1000, 'work finished');
});

socketConnection.addEventListener('error', error => {
	console.log(`Произошла ошибка: ${error.data}`);
});