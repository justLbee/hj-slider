'use strict';

const bigPicture = document.getElementById('view');
const miniaturesList = document.getElementsByTagName('a');
const miniaturesArr = Array.from(miniaturesList);

function showPic() {
	event.preventDefault();

	bigPicture.src = this.href;
}

miniaturesArr.forEach(picture => {
	picture.addEventListener('click', showPic);
});