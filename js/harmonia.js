(_ => {
    "use strict";
    
    const LENSES = document.querySelectorAll('.lens');
    const LENS_INFO = document.querySelectorAll('.lensInfo');
    const PAGE_NAV = document.querySelectorAll('.paginationNav li div');
    const PAGES = document.querySelectorAll('.page');
    const PICTOGRAM = document.querySelector('.logo_pictogram');
    const SLOW_EASE = "slow(0.7, 0.7, false)";
    const ANATOMY_LENS_PAGE = 2, INTERACTIVE_ANATOMY_SCROLL= 3;
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
                    if (j == ANATOMY_LENS_PAGE) {
                        lensTimeline.restart();
                    } 
                    // else if (j == INTERACTIVE_ANATOMY_SCROLL){
                    //     gsap.fromTo(FRAME_IMG, 2, { autoAlpha: 0} , { autoAlpha: 1, y: 10, ease: SLOW_EASE })
                        
                    //     // refresh to fix trigger bug https://stackoverflow.com/a/64669108
                    //     ScrollTrigger.refresh();
                    // }
                 }
                else 
                    page.classList.add('hidden');
            });
        });
    });
    
        // // frame scrubber
        // let frames = { frame: 0 };
        // let totalFrames = 90; 
        // const FRAME_IMG = document.querySelector('.frameImg');

        // gsap.registerPlugin(ScrollTrigger);
        // gsap.to(frames, {
        //     frame: totalFrames - 1, 
        //     snap: "frame", 
        //     scrollTrigger: {
        //         // markers: true,
        //         toggleActions: "play pause resume reset",
        //         scroller: ".frameSeqCon1",
        //         scrub: 0.75
        //     }, 
        //     onUpdate: _ => {
        //         FRAME_IMG.src = `images/harmonia/frames/frame${(frames.frame).toString().padStart(4, '0')}.jpg`;
        //     }
        // });

    // animate logo pictogram
    PICTOGRAM.addEventListener("mouseover", _ => {
        gsap.to(PICTOGRAM, 1, { rotation: 15, ease: SLOW_EASE } );
    });

    PICTOGRAM.addEventListener("mouseout", _ => {
        gsap.to(PICTOGRAM, 1, { rotation: -15, ease: SLOW_EASE } );
    });

    const MODEL_VIEWER = document.querySelector('model-viewer');
    const OVERLAY_TEXT = document.querySelector('.overlayText');
    
    // show text on load
    MODEL_VIEWER.addEventListener("model-visibility", e => {
        if (e.detail.visible) {
            gsap.fromTo(OVERLAY_TEXT, 3, { autoAlpha: 0} , { autoAlpha: 1, ease: SLOW_EASE })
            OVERLAY_TEXT.classList.remove('hidden');
        }
    });

    // hide text on progress
    MODEL_VIEWER.addEventListener("progress", _ => {
        OVERLAY_TEXT.classList.add('hidden');
    });

    // drag reveal widget
    let xrayCon = document.querySelector('.xrayCon');
    let imgBottom = document.querySelector('.imgBottom');
    let imgTop = document.querySelector('.imgTop');
    let imgScrubber = document.querySelector('.imgScrubber');

    let isScrubbing = false;
    let start = 0, end = xrayCon.offsetWidth;
    
    imgScrubber.addEventListener('click', _ => { isScrubbing = !isScrubbing; });//~
    document.addEventListener('mousemove', e => { 
        if(isScrubbing) {
            let x = e.clientX - xrayCon.getBoundingClientRect().left;
            // console.log(x)
            if(x < start) { x = start; }
            else if (x > end) { x = end - 2; }
            
            imgScrubber.style.left = x + 'px';
            imgTop.style.width = x + 'px';
        }
     });

    // google charts
    google.charts.load('current', { packages: ['wordtree'] });
    google.charts.setOnLoadCallback(renderWordTree);
    let data;
    function renderWordTree() {//~
        data = google.visualization.arrayToDataTable(
            [   ['id', 'childLabel', 'parent', 'size', { role: 'style'}],
                [0, 'Arthropoda', -1, 1, 'black'],
                [1, 'Insecta', 0, 1, 'black'],
                [2, 'Coleoptera', 1, 1, 'black'],
                [3, 'Harmonia Axyridis', 2, 1, 'black'],

                [4, 'Coccinella 22-Punctata', 2, 1, 'black'],

                [5, 'Chrysomela Cerealis', 2, 1, 'black'],

                [6, 'Lepidoptera', 1, 1, 'black'],
                [7, 'Gonepteryx Merula', 6, 1, 'black'],
                [8, 'Vanessa Cardui', 6, 1, 'black'],
                
                [9, 'Nymphalis Phoroys', 6, 1, 'black']
            ]
        );

        let options = {
            colors: ['black', 'red', 'green'],//~
            wordtree: {
                format: 'explicit',
                backgroundColor: '#FDFDEC',
                type: 'suffix'
            }
        };

        console.log(google.visualization)
        let wordTreeVis = new google.visualization.WordTree(document.querySelector('.wordTree'));
        wordTreeVis.draw(data, options);
    } 

})();