'use strict';

const domTable = document.getElementsByTagName('table')[0];

function handleTableClick(event) {
	if(event.target.classList.contains('prop__name')) {
		let editingTh = event.target;
		let sortField = editingTh.dataset.propName;
		let direction;

		if(!editingTh.dataset.dir || editingTh.dataset.dir === '-1' ) {
			editingTh.dataset.dir = '1';
		}
		else {
			editingTh.dataset.dir = '-1';
		}

		domTable.dataset.sortBy = sortField;
		direction = Number(editingTh.dataset.dir);

		sortTable(sortField, direction);
	}
}