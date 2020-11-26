(_ => {
	"use strict";

	const DOWN_SCROLL = document.querySelector('.downScroll');
	const BUGS = document.querySelectorAll('.bug');
	const BUG_TITLES = document.querySelectorAll('.bug h4');
	const LOGO = document.querySelectorAll('.logo');
	let currTitle;

	gsap.registerPlugin(ScrollToPlugin);

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

	let timeline = gsap.timeline();
	let easeFunction = "slow(0.7, 0.7, false)";
	timeline
		.from(".logo", 1.5, { autoAlpha: 0, ease: easeFunction })
		.from(".hero p", 1.5, { autoAlpha: 0, ease: easeFunction })
		.from(".hero img", 1.5, { autoAlpha: 0, ease: easeFunction });
})();