'use strict';

let contactObj = JSON.parse(loadContacts());
let contactList;

function addElement(name, mail, phone) {
	contactList.innerHTML += `<li data-email="${mail}" data-phone="${phone}"><strong>${name}</strong></li>`;
}

function init() {
	contactList = document.getElementsByClassName('contacts-list')[0];
	contactList.innerHTML = '';

	for (let i = 0; i < contactObj.length; i++) {
		addElement(contactObj[i].name, contactObj[i].email, contactObj[i].phone);
	}
}

document.addEventListener('DOMContentLoaded', init);