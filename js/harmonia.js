(_ => {
    "use strict";
    
    const LENSES = document.querySelectorAll('.lens');
    const LENS_INFO = document.querySelectorAll('.lensInfo');
    const PAGE_NAV = document.querySelectorAll('.paginationNav li div');
    const PAGES = document.querySelectorAll('.page');
    const PICTOGRAM = document.querySelector('.logo_pictogram');
    const SLOW_EASE = "slow(0.7, 0.7, false)";
    let toggleAlpha = [];

    // set up magnifying lens animations and clickable functionality
    let lensTimeline = gsap.timeline();
    lensTimeline.fromTo(".harmoniaImg", 1.5, { autoAlpha: 0} , { autoAlpha: 1, ease: SLOW_EASE });
    LENSES.forEach(lens => {

        // add staggering animation 
        lensTimeline.fromTo(lens, 0.3, { autoAlpha: 0} , { autoAlpha: 1, ease: SLOW_EASE });

        // set visibility toggle
        toggleAlpha.push(1);
        
        // show info box on click
        lens.addEventListener("click", e => {

            // console.log(lens.left)
            let currIndex = e.currentTarget.dataset.lensindex;
            gsap.to(LENS_INFO[currIndex], 1.5, { autoAlpha: toggleAlpha[currIndex] });
            toggleAlpha[currIndex] = toggleAlpha[currIndex] ? 0 : 1;
        });
    });

    // add pagination
    PAGE_NAV.forEach((pageButton, i) => {
        pageButton.addEventListener("click", _ => {
            // change button color
            pageButton.classList.add('selected');

            // reset other buttons
            PAGE_NAV.forEach((p, j) => { if (i != j) p.classList.remove('selected'); });

            // show relevant page
            PAGES.forEach((page, j) => {
                if (j == i){
                    page.classList.remove('hidden');
                    
                    // restart animation
                    if (j == 0) {
                        lensTimeline.restart();
                    } else if (j == 1){
                        gsap.fromTo(FRAME_IMG, 2, { autoAlpha: 0} , { autoAlpha: 1, y: 10, ease: SLOW_EASE })
                        
                        // refresh to fix trigger bug https://stackoverflow.com/a/64669108
                        ScrollTrigger.refresh();
                    }
                 }
                else 
                    page.classList.add('hidden');
            });
        });
    });
    
    // frame scrubber
    let frames = { frame: 0 };
    let totalFrames = 90; 
    const FRAME_IMG = document.querySelector('.frameImg');

    gsap.registerPlugin(ScrollTrigger);
    gsap.to(frames, {
        frame: totalFrames - 1, 
        snap: "frame", 
        scrollTrigger: {
            // markers: true,
            toggleActions: "play pause resume reset",
            scroller: ".frameSeqCon1",
            scrub: 0.75
        }, 
        onUpdate: _ => {
            FRAME_IMG.src = `images/harmonia/frames/frame${(frames.frame).toString().padStart(4, '0')}.jpg`;
        }
    });

    // animate logo pictogram
    PICTOGRAM.addEventListener("mouseover", _ => {
        gsap.to(PICTOGRAM, 1, { rotation: 15, ease: SLOW_EASE } );
    });

    PICTOGRAM.addEventListener("mouseout", _ => {
        gsap.to(PICTOGRAM, 1, { rotation: -15, ease: SLOW_EASE } );
    });
})();