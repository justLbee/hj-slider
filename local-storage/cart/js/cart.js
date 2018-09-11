'use strict';

const colorSnippets = document.getElementById('colorSwatch');
const sizesSnippets = document.getElementById('sizeSwatch');
const cartSnippets = document.getElementById('quick-cart');
const cart = document.getElementById('quick-cart');
const addToCart = document.getElementById('AddToCart');
const addToCartForm = document.getElementById('AddToCartForm');

addToCart.addEventListener('click', addToCartFunc);
addToCartForm.addEventListener('click', storageAdd);
// Получение цветов
fetch('https://neto-api.herokuapp.com/cart/colors', {
	credentials: 'same-origin',
	method: 'GET',
})
	.then((res) => {
		if (200 <= res.status && res.status < 300) {
			return res;
		}
		throw new Error(res.statusText);
	})
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		addColors(data);
	})
	.catch((err) => {
		console.log(err);
	});

// Получение размеров
fetch('https://neto-api.herokuapp.com/cart/sizes', {
	credentials: 'same-origin',
	method: 'GET',
})
	.then((res) => {
		if (200 <= res.status && res.status < 300) {
			return res;
		}
		throw new Error(res.statusText);
	})
	.then((res) => {
		return res.json();
	})
	.then((data) => {
		addSizes(data)
	})
	.catch((err) => {
		console.log(err);
	});

// Получение корзины
function getCart() {
	fetch('https://neto-api.herokuapp.com/cart', {
		credentials: 'same-origin',
		method: 'GET',
	})
		.then((res) => {
			if (200 <= res.status && res.status < 300) {
				return res;
			}
			throw new Error(res.statusText);
		})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			updateCart(data)
		})
		.catch((err) => {
			console.log(err);
		});
}

function addColors(colorsObj) {
	colorsObj.forEach(color => {
		let available, disabled;
		if (color.isAvailable) {
			available = 'available';
			disabled = '';
		}
		else {
			available = 'soldout';
			disabled = 'disabled';
		}

		colorSnippets.innerHTML += `
		<div data-value="${color.type}" class="swatch-element color ${color.type} ${available}">
			<div class="tooltip">${color.title}</div>
			<input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value="${color.type}" ${disabled}>
		<label for="swatch-1-${color.type}" style="border-color: red;">
			<span style="background-color: ${color.code};"></span>
			<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
			</label>
			</div>`
	});

	let activeColor = Array.from(document.querySelectorAll('.swatch-element input'));

	activeColor.forEach(el => {
		if (el.value === localStorage.color) {
			el.checked = true;
		}
	});
}

function addSizes(sizesObj) {
	sizesObj.forEach(size => {
		let available, disabled;
		if (size.isAvailable) {
			available = 'available';
			disabled = '';
		}
		else {
			available = 'soldout';
			disabled = 'disabled';
		}

		sizesSnippets.innerHTML += `
		<div data-value="${size.type}" class="swatch-element plain ${size.type} ${available}">
  		<input id="swatch-0-${size.type}" type="radio" name="size" value="${size.type}" ${disabled}>
  		<label for="swatch-0-${size.type}">
    	${size.title}
    	<img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
  		</label>
		</div>`
	});

	let activeSize = Array.from(document.querySelectorAll('.swatch-element input'));

	activeSize.forEach(el => {
		if (el.value === localStorage.size) {
			el.checked = true;
		}
	})
}

function updateCart(cartObj) {
	let fullPrice = 0;
	while (cartSnippets.firstChild) {
		cartSnippets.removeChild(cartSnippets.firstChild);
	}

	cartObj.forEach(good => {
		fullPrice = good.price * good.quantity;
		cartSnippets.innerHTML += `
		<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${good.productId}" style="opacity: 1;">
  		<div class="quick-cart-product-wrap">
    		<img src="${good.pic}" title="${good.title}">
    		<span class="s1" style="background-color: #000; opacity: .5">$800.00</span>
    		<span class="s2"></span>
  		</div>
  		<span class="count hide fadeUp" id="quick-cart-product-count-${good.productId}">${good.quantity}</span>
  		<span class="quick-cart-product-remove remove" data-id="${good.productId}"></span>
		</div>`
	});

	cartSnippets.innerHTML += `
		<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico open">
  		<span>
    		<strong class="quick-cart-text">Оформить заказ<br></strong>
    		<span id="quick-cart-price">${fullPrice}</span>
  		</span>
		</a>`;

	const quickCart = document.getElementById('quick-cart-pay');
	const removeButton = document.querySelector('.remove');

	let removeId = new FormData();

	if (cartObj.length === 0) {
		quickCart.classList.remove('open');
	}
	else {
		removeId.append('productId', `${removeButton.dataset.id}`);

		removeButton.addEventListener('click', event => {
			event.preventDefault();
			fetch('https://neto-api.herokuapp.com/cart/remove', {
				body: removeId,
				credentials: 'same-origin',
				method: 'POST',
			})
				.then((res) => {
					if (200 <= res.status && res.status < 300) {
						return res;
					}
					throw new Error(res.statusText);
				})
				.then((res) => {
					return res.json();
				})
				.then((data) => {
					updateCart(data);
				})
				.catch((err) => {
					console.log(err);
				});
		});
	}
}

function addToCartFunc() {
	event.preventDefault();

	const cartFormData = new FormData(addToCartForm);
	cartFormData.append('productId', `${addToCartForm.dataset.productId}`);
	let cartPostData = {};
	let cartPostString = '';

	for (const [k, v] of cartFormData) {
		cartPostData[k] = v;
		cartPostString += k + ':' + v + ';';
	}

	cartPostData.productId = addToCartForm.dataset.productId;

	fetch('https://neto-api.herokuapp.com/cart', {
		body: cartFormData,
		credentials: 'same-origin',
		method: 'POST',
	})
		.then((res) => {
			if (200 <= res.status && res.status < 300) {
				return res;
			}
			throw new Error(res.statusText);
		})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			updateCart(data);
		})
		.catch((err) => {
			console.log(err);
		});
}

function storageAdd(event) {
	if (event.target.name === 'size') {
		localStorage.size = event.target.value;
	}
	if (event.target.name === 'color') {
		localStorage.color = event.target.value;
	}
}

document.addEventListener('DOMContentLoaded', getCart);