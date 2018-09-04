'use strict';

let activeLogo = null;
let shiftX = 0;
let shiftY = 0;

const trash = document.getElementById('trash_bin');

document.addEventListener('mousedown', takeLogo);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', drop);

function takeLogo(event) {
	if (event.target.classList.contains('logo')) {
		activeLogo = event.target;

		const bounds = event.target.getBoundingClientRect();
		shiftX = event.pageX - bounds.left - 	window.pageXOffset;
		shiftY = event.pageY - bounds.top - window.pageYOffset;
	}
}

function drag() {
	if(activeLogo) {
		event.preventDefault();

		activeLogo.style.left = event.pageX - shiftX + 'px';
		activeLogo.style.top = event.pageY - shiftY + 'px';
		activeLogo.classList.add('moving');
	}
}

function drop(){
	if(activeLogo) {
		activeLogo.style.visibility = 'hidden';
		const position = document.elementFromPoint(event.clientX, event.clientY);
		activeLogo.style.visibility = 'visible';

		if (trash === position) {
			activeLogo.style.display = 'none';
			activeLogo.classList.remove('moving');
			activeLogo = null;
		}

		else {
			activeLogo.classList.remove('moving');
			activeLogo = null;
		}
	}
}