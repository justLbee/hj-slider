'use strict';
const showMoreBut = document.querySelector('.show-more');

showMoreBut.addEventListener('click', Cart);

function Cart() {
	const itemsList = document.getElementsByClassName('items-list');

	Array.from(itemsList).forEach(item => {
		let buttons = item.querySelectorAll('.add-to-cart');

		Array.from(buttons).forEach(button => {
			button.addEventListener('click', () => {
				const item = {
					title: event.target.dataset.title,
					price: event.target.dataset.price
				};

				addToCart(item);
			})
		})

	});
}

document.addEventListener('DOMContentLoaded', Cart);