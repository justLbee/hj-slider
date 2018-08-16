'use strict';

const signIn = document.querySelector('.sign-in-htm');
const signUp = document.querySelector('.sign-up-htm');
const buttons = Array.from(document.querySelectorAll('.button'));
const outputLoginField = signIn.querySelector('.error-message');
const outputRegisterField = signUp.querySelector('.error-message');

buttons.forEach(button => {
	button.addEventListener('click', postData)
});

function postData() {
	event.preventDefault();

	let postLoginObj = {};
	let postUrl = '';
	let flag; // если 0 - то логин, если 1 - то регистрация

	if (event.target.value === 'Войти') {
		const signInData = new FormData(signIn);

		for (const [k, v] of signInData) {
			postLoginObj[k] = v;
		}

		postUrl = 'https://neto-api.herokuapp.com/signin';
		flag = 0;
	}

	if (event.target.value === 'Зарегистрироваться') {
		const signInData = new FormData(signUp);

		for (const [k, v] of signInData) {
			postLoginObj[k] = v;
		}

		postUrl = 'https://neto-api.herokuapp.com/signup';
		flag = 1;
	}

	fetch(postUrl, {
		body: JSON.stringify(postLoginObj),
		credentials: 'same-origin',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then((res) => {
		if (200 <= res.status && res.status < 300) {
			return res;
		}
		throw new Error(res.statusText);
	})
		.then((res) => { return res.json(); })
		.then((data) => {
			if(data.error) {
				flag > 0 ? outputRegisterField.textContent = data.message : outputLoginField.textContent = data.message;
			}
			else {
				flag > 0 ? outputRegisterField.textContent = `Пользователь ${data.name} успешно зарегистрирован` :
									 outputLoginField.textContent = `Пользователь ${data.name} успешно авторизован`
			}
		})
		.catch((err) => { console.log(err); })
}