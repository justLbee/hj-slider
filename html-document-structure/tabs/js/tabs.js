'use strict';

const tabsContent = document.querySelectorAll('.tabs-content');
const tabsNav = document.querySelector('.tabs-nav');


Array.from(tabsContent).forEach(tab => {
	tab.childNodes.forEach(article => {
		if (!article.dataset) {
			return;
		}

		article.classList.add('hidden');

		let tabDataObj = {
			title: article.dataset.tabTitle,
			icon: article.dataset.tabIcon
		};

		addTabs(tabDataObj);
	});

	tab.firstElementChild.classList.remove('hidden');
	tabsNav.removeChild(tabsNav.firstElementChild);
});

function addTabs(data) {
	let newTabEl = tabsNav.firstElementChild.cloneNode(true);

	tabsNav.appendChild(newTabEl);

	tabsNav.lastElementChild.childNodes.forEach(el => {
		el.textContent = data.title;
		el.classList.add(`${data.icon}`)
	});
}

const tabsNavEl = document.querySelectorAll('.tabs-nav li a');

tabsNavEl[0].classList.add('ui-tabs-active');

Array.from(tabsNavEl).forEach(tab => {
	tab.addEventListener('click', changeTab)
});

function changeTab() {
	const currentTab = document.querySelector('.ui-tabs-active');

	currentTab.classList.remove('ui-tabs-active');
	this.classList.add('ui-tabs-active');

	Array.from(tabsContent).forEach(tab => {
		tab.childNodes.forEach(article => {

			if (!article.dataset) {
				return;
			}
			if (article.dataset.tabTitle !== this.textContent) {
				article.classList.add('hidden');
			}
			else {
				article.classList.remove('hidden');
			}
		});
	});
}