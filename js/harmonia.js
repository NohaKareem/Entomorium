(_ => {
    "use strict";
    
    const LENSES = document.querySelectorAll('.lens');
    const LENS_INFO = document.querySelectorAll('.lensInfo');
    // const LENS_INFO = document.querySelector('.lensInfo');
    const PAGE_NAV = document.querySelectorAll('.paginationNav li div');
    const PAGES = document.querySelectorAll('.page');
    
    let toggleAlpha = [];
    // let toggleAlpha = 1;

    // show info box on click
    LENSES.forEach(lens => {
        toggleAlpha.push(1);
        lens.addEventListener("click", e => {

            // console.log(lens.left)
            let currIndex = e.currentTarget.dataset.lensindex;
            console.log(currIndex)
            console.log(LENS_INFO[currIndex])
            gsap.to(LENS_INFO[currIndex], 1.5, { autoAlpha: toggleAlpha[currIndex] });
            toggleAlpha[currIndex] = toggleAlpha[currIndex] ? 0 : 1;

            // console.log('stule')
            // LENS_INFO[currIndex].style.top = lens.style.top - 10;
            // console.log(LENS_INFO[currIndex].style.top)
            // console.log(lens.style.top)
            // console.log(window.getComputedStyle(lens).getPropertyValue('top'))
            // LENS_INFO[currIndex].style.left = lens.style.left - 100;
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
                if (j == i)
                    page.classList.remove('hidden');
                else 
                    page.classList.add('hidden');
            });
        });
    });

    let frames = { frame: 0 };
    let totalFrames = 90; //~
    let frameImages = [];
    const FRAME_IMG = document.querySelector('.frameImg');
    const CANVAS = document.querySelector('#harmoniaFramesCanvas');
    const CNTXT = CANVAS.getContext("2d");

    // load images
    for(let i = 0; i < totalFrames; i++) {
        let newImg = new Image();
        newImg.src =  `images/harmonia/frames/frame${(i+1).toString().padStart(4, '0')}.jpg`;
        frameImages.push(newImg);
    }

    let loadFrame = _ => {
        CNTXT.clearRect(0, 0, CANVAS.width, CANVAS.height);
        CNTXT.drawImage(frameImages[frames.frame], 0, 0);//~
        // console.log(frameImages[frames.frame])
        console.log('loading')
        // console.log(document.querySelector('.frameSeqCon1'))
        FRAME_IMG.src = `images/harmonia/frames/frame${(frames.frame).toString().padStart(4, '0')}.jpg`;
        
    };

    
    // console.log(frameImages)

    frameImages[0].onload = loadFrame;


    // frame scrubber~
    gsap.to(frames, {
        frame: totalFrames - 1, 
        snap: "frame", 
        scrollTrigger: {
            // horizontal: true, 
            // markers: true,
            // scroller: ".page3",
            // scroller: ".frameSequence",
            // scroller: ".frameSeqCon1",
            scrub: 0.5//~
        }, 
        onUpdate: loadFrame
    });


})();