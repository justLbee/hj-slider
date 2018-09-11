'use strict';
const itemsList = document.querySelector('.items-list');

function Cart() {
	itemsList.addEventListener('click', e => {
		e.preventDefault();
		console.log(e.currentTarget);
		if (e.target.classList.contains('add-to-cart')) {
			const element = {
				title: e.target.dataset.title,
				price: e.target.dataset.price
			};

			addToCart(element);
		}
	});
}

document.addEventListener('DOMContentLoaded', Cart);