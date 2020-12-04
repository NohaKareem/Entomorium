// (_ => {
// 	"use strict";

// 	const VID = document.querySelector('video');
// 	const PLAY_BTN = document.querySelector('.play');
// 	const SPEED_BTN = document.querySelector('.speed');
// 	const STOP_BTN = document.querySelector('.stop');
// 	const SCRUB_SLIDER = document.querySelector('.scrubSlider');
// 	const SCRUB_PROGRESS = document.querySelector('.seen');
// 	const SCRUB_MAX = SCRUB_SLIDER.max;
// 	const TIME_LAPSED = document.querySelector('.scrubberCon span');
// 	const PLAY_FA = `<i class="fa fa-play" aria-hidden="true"></i>`;
// 	const PAUSE_FA = `<i class="fa fa-pause" aria-hidden="true"></i>`;

// 	let speed = 1;

// 	VID.removeAttribute('controls');

// 	// update button display
// 	let updateButton = (btn, html) => { btn.innerHTML = html; }
	
// 	// pad input with leading zero
// 	let padZeros = num => { return `${num}`.padStart(2, '0'); }

// 	// toggle play pause 
// 	PLAY_BTN.addEventListener('click', _ => {
// 		if(VID.paused) {
// 			updateButton(PLAY_BTN, PAUSE_FA);
// 			VID.play();
// 		} else {
// 			updateButton(PLAY_BTN, PLAY_FA);
// 			VID.pause();
// 		}
// 	});

// 	// modify speed
// 	SPEED_BTN.addEventListener('click', _ => {
// 		speed = (speed + 0.25) % 2;
// 		speed = speed > 0 ? speed : 2;
// 		SPEED_BTN.innerHTML = `${speed}X`;
// 		VID.playbackRate = speed;
// 	}); 

// 	// stop video event handler
// 	let stopVid = _ => {
// 		VID.pause();
// 		VID.currentTime = 0; 
// 		updateButton(PLAY_BTN, PLAY_FA);
// 	}

// 	// stop on click, or auto-stop on complete
// 	STOP_BTN.addEventListener('click', stopVid);
// 	VID.addEventListener('ended', stopVid);

// 	// get scrub value
// 	let getScrubValue = _ => { return (SCRUB_MAX * VID.currentTime) / VID.duration; }

// 	// update scrub progress
// 	let updateScrubProgress = _ =>  { SCRUB_PROGRESS.style.width = `${getScrubValue()}%`; }

// 	// update scrubber time and position
// 	VID.addEventListener('timeupdate', e => {
// 		SCRUB_SLIDER.value = getScrubValue();
// 		updateScrubProgress();
		
// 		let minutes = Math.floor(VID.currentTime / 60);
// 		let seconds = Math.floor(VID.currentTime - minutes * 60);
// 		TIME_LAPSED.innerHTML = `${padZeros(minutes)}:${padZeros(seconds)}`;
// 	});
	
// 	// update scrub slider on input 
// 	SCRUB_SLIDER.addEventListener('input', e => {
// 		VID.currentTime = e.currentTarget.value * VID.duration / SCRUB_MAX;
// 		updateScrubProgress();
// 	});
// })();