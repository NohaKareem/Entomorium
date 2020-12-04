(_ => {
    "use strict";
    
    const LENSES = document.querySelectorAll('.lens');
    const LENS_INFO = document.querySelector('.lensInfo');
    const PAGE_NAV = document.querySelectorAll('.paginationNav li div');
    const PAGES = document.querySelectorAll('.page');
    
    let toggleAlpha = 1;

    // show info box on click
    LENSES.forEach(lens => {
        lens.addEventListener("click", _ => {
            // LENS_INFO.top = lens.top - 10;
            // console.log(document.querySelector('.lens1'))
            // LENS_INFO.left = lens.left - 100;
            // console.log(lens.left)
            gsap.to(LENS_INFO, 1.5, { autoAlpha: toggleAlpha });
            toggleAlpha = toggleAlpha ? 0 : 1;
        });
    });

    // add pagination
    PAGE_NAV.forEach((pageButton, i) => {
        pageButton.addEventListener("click", _ => {
            PAGES.forEach((page, j) => {
                if (j == i)
                    page.classList.remove('hidden');
                else {
                    page.classList.add('hidden');
                    console.log(page.classList)
                }
            });
        });
    });

    let frames = { frame: 0 };
    let totalFrames = 90; //~
    const FRAME_IMG = document.querySelector('.frameImg');

    let swapFrames = _ => {
        FRAME_IMG.src = `images/harmonia/frames/frame${(frames.frame).toString().padStart(4, '0')}.jpg`;
    };

    // frame scrubber~
    gsap.to(frames, {
        frame: totalFrames - 1, 
        snap: "frame", 
        scrollTrigger: {
            scrub: 0.5//~
        }, 
        onUpdate: swapFrames
    });


})();