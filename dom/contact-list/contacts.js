'use strict';

let contactObj = JSON.parse(loadContacts());
let contactList, contactArgs;

function addElement(name) {
	contactList.innerHTML += `<li><strong>${name}</strong></li>`;
}

function init() {
	contactList = document.getElementsByClassName('contacts-list')[0];
	contactList.innerHTML = '';

	for (let i = 0; i < contactObj.length; i++) {
		addElement(contactObj[i].name);
	}

	contactArgs = document.querySelectorAll('ul.contacts-list > li');

	for (let i = 0; i < contactObj.length; i++) {
		contactArgs[i].dataset.email = contactObj[i].email;
		contactArgs[i].dataset.phone = contactObj[i].phone;
	}
}

document.addEventListener('DOMContentLoaded', init);