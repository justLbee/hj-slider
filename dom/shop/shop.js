'use strict';

let addButtons, price, totalEl, amountEl;
let amount = 0;
let total = 0;

function init() {
	addButtons = document.getElementsByTagName('button');
	totalEl = document.getElementById('cart-total-price');
	amountEl = document.getElementById('cart-count');

	for(let i = 0; i < addButtons.length; i++) {
		addButtons[i].addEventListener('click', changePrice);
	}
}

function changePrice() {
	amount++;
	amountEl.innerHTML = `${amount}`;

	total += Number(event.srcElement.getAttribute('data-price'));
	totalEl.innerHTML = `${total}`;
}

document.addEventListener('DOMContentLoaded', init);