(_ => {
	"use strict";

	const DOWN_SCROLL = document.querySelector('.downScroll');
	const BUGS = document.querySelectorAll('.bug');
	const BUG_TITLES = document.querySelectorAll('.bug h4');
	let currTitle;

	// scrollto animation
	DOWN_SCROLL.addEventListener("click", e => {
		TweenLite.to(window, 1.5, {
			scrollTo: {
				y: ".menu", 
				offsetY: 20, 
				autoKill: false, 
				ease: "slow(0.7, 0.7, false)"
			}
		});
	});

	// alter hover text for bugs coming soon
	BUGS.forEach((bug, i) => {
		bug.addEventListener("mouseover", _=> {
			if (!bug.classList.contains('activeOption')) {
				currTitle = BUG_TITLES[i].innerHTML;
				BUG_TITLES[i].innerHTML = "Coming Soon";
			}
		});

		bug.addEventListener("mouseout", _=> {
			if (!bug.classList.contains('activeOption')) { 
				BUG_TITLES[i].innerHTML = currTitle;
			}
		});
	});
})();