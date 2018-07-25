'use strict';

let dropdown = document.getElementsByClassName('wrapper-dropdown')[0];

dropdown.onclick = function () {
	dropdown.classList.toggle('active');
};
