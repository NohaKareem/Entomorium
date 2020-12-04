(_ => {
    "use strict";
    
    const LENSES = document.querySelectorAll('.lens');
    const LENS_INFO = document.querySelectorAll('.lensInfo');
    const PAGE_NAV = document.querySelectorAll('.paginationNav li div');
    const PAGES = document.querySelectorAll('.page');
    const PICTOGRAM = document.querySelector('.logo_pictogram');
    const SLOW_EASE = "slow(0.7, 0.7, false)";
    let toggleAlpha = [];

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
                    if (j == 0) 
                        lensTimeline.restart();
                    else if (j == 1)
                        gsap.fromTo(FRAME_IMG, 2, { autoAlpha: 0} , { autoAlpha: 1, ease: SLOW_EASE })
                 }
                else 
                    page.classList.add('hidden');
            });
        });
    });

    let frames = { frame: 0 };
    let totalFrames = 90; 
    let frameImages = [];
    const FRAME_IMG = document.querySelector('.frameImg');
    const CANVAS = document.querySelector('#harmoniaFramesCanvas');
    const CNTXT = CANVAS.getContext("2d");

    // // load images
    // for(let i = 0; i < totalFrames; i++) {
    //     let newImg = new Image();
    //     newImg.src =  `images/harmonia/frames/frame${(i+1).toString().padStart(4, '0')}.jpg`;
    //     frameImages.push(newImg);
    // }

    let loadFrame = _ => {
        // CNTXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
        // CNTXT.drawImage(frameImages[frames.frame], 0, 0);//~
        // console.log(frameImages[frames.frame])
        console.log('loading')
        // console.log(document.querySelector('.frameSeqCon1'))
        FRAME_IMG.src = `images/harmonia/frames/frame${(frames.frame).toString().padStart(4, '0')}.jpg`;
        console.log(FRAME_IMG.src)
    };


    
    // console.log(frameImages)

    // frameImages[0].onload = loadFrame;

    // frame scrubber~
    gsap.to(frames, {
        frame: totalFrames - 1, 
        snap: "frame", 
        scrollTrigger: {
            // horizontal: true, 
            markers: true,
            // scroller: ".frameSequence",
            scroller: ".frameSeqCon1",
            scrub: 0.75//~
        }, 
        onUpdate: _ => {
           FRAME_IMG.src = `images/harmonia/frames/frame${(frames.frame).toString().padStart(4, '0')}.jpg`;
        }
    });

    PICTOGRAM.addEventListener("mouseover", _ => {
        gsap.to(PICTOGRAM, 1, { rotation: 15, ease: SLOW_EASE } );
    });

    PICTOGRAM.addEventListener("mouseout", _ => {
        gsap.to(PICTOGRAM, 1, { rotation: -15, ease: SLOW_EASE } );
    });
})();