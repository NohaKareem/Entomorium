(_ => {
    "use strict";
    
    const LENSES = document.querySelectorAll('.lens');
    const LENS_INFO = document.querySelectorAll('.lensInfo');
    const PAGE_NAV = document.querySelectorAll('.paginationNav li div');
    const PAGES = document.querySelectorAll('.page');
    const TEXT_MENU = document.querySelectorAll('.textMenu li a');
    const PICTOGRAM = document.querySelector('.logo_pictogram');
    const LABEL_LINES = document.querySelectorAll('.line');
    const LINE_LABELS = document.querySelectorAll('.lineLabel');
    const SLOW_EASE = "slow(0.7, 0.7, false)";

    const ANATOMY_LENS_PAGE = 4, HABITAT_PAGE = 3, DIET_PAGE = 2, XRAY_PAGE = 6;
    let DAT_GUI;

    window.onload = _ => {
        DAT_GUI = document.querySelector('#datGui');
    }

    let revealAnim = (obj, time) => { gsap.fromTo(obj, time, { autoAlpha: 0 }, { autoAlpha: 1, ease: SLOW_EASE }); }

    let toggleAlpha = [];
    let dietTimeline = gsap.timeline();

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

    let handlePage = (i) => {
        PAGES.forEach((page, j) => {
            if (j == i) {
                // reveal overlay text
                revealAnim(OVERLAY_TEXT[i], 3);
                OVERLAY_TEXT[i].classList.remove('hidden');

                page.classList.remove('hidden');
                DAT_GUI.style.display = 'none';

                // handle separate pages 
                switch(j) {
                    // reset lenses + animation
                    case ANATOMY_LENS_PAGE:
                       toggleAlpha.forEach((lensAlpha, k) => { 
                           lensAlpha = 1; 
                           gsap.to(LENS_INFO[k], 0, { autoAlpha: 0 });
                    });
                       lensTimeline.restart();
                        break;
                    case HABITAT_PAGE:
                        revealAnim(DAT_GUI, 3);
                        DAT_GUI.style.display = 'block';
                        break;
                    case DIET_PAGE:
                        dietTimeline.restart();
                        break;
                    case XRAY_PAGE:
                        LABEL_LINES.forEach(line => { revealAnim(line, 3) });
                        LINE_LABELS.forEach(label => { revealAnim(label, 3) });
                        break;
                }
            } else { page.classList.add('hidden'); } 
        });
    }

    // handle nav clicks
    let handleClick = (e) => {
        let i = e.currentTarget.i;
        let navigator = e.currentTarget.navigator;
        // change button color
        navigator.classList.add('selected');

        // reset other buttons
        PAGE_NAV.forEach((p, j) => { if (i != j) p.classList.remove('selected'); });

        // update text nav bar
        TEXT_MENU[i].classList.add('selected');
        TEXT_MENU.forEach((p, j) => { if (i != j) p.classList.remove('selected'); });

        handlePage(i);
    }

    // add pagination
    PAGE_NAV.forEach((pageButton, i) => {
        pageButton.addEventListener("click", handleClick);
        pageButton.i = i;
        pageButton.navigator = pageButton;

        let textMenuItem = TEXT_MENU[i];
        textMenuItem.addEventListener("click", handleClick);
        textMenuItem.i = i;
        textMenuItem.navigator = textMenuItem;
    });

    // animate logo pictogram
    PICTOGRAM.addEventListener("mouseover", _ => {
        gsap.to(PICTOGRAM, 1, { rotation: 15, ease: SLOW_EASE } );
    });

    PICTOGRAM.addEventListener("mouseout", _ => {
        gsap.to(PICTOGRAM, 1, { rotation: -15, ease: SLOW_EASE } );
    });

    const MODEL_VIEWER = document.querySelector('model-viewer');
    const OVERLAY_TEXT = document.querySelectorAll('.overlayText');
    
    // show text on load
    MODEL_VIEWER.addEventListener("model-visibility", e => {
        if (e.detail.visible) {
            revealAnim(OVERLAY_TEXT[0], 3);
            OVERLAY_TEXT[0].classList.remove('hidden');
        }
    });

    // hide text on progress
    MODEL_VIEWER.addEventListener("progress", _ => {
        OVERLAY_TEXT[0].classList.add('hidden');
    });

    // x-ray scrubber widget
    let xrayCon = document.querySelector('.xrayCon');
    let imgTop = document.querySelector('.imgTop');
    let imgScrubber = document.querySelector('.imgScrubber');
    let circleScrubber = document.querySelector('.circleScrubber');

    let isScrubbing = false;
    let start = 0, end = xrayCon.offsetWidth;
    
    imgScrubber.addEventListener('mousedown', _ => { isScrubbing = true; });
    document.addEventListener('mouseup', _ => { isScrubbing = false; });
    document.addEventListener('mousemove', e => { 
        if(isScrubbing) {
            let x = e.clientX - xrayCon.getBoundingClientRect().left;
            if(x < start) { x = start; }
            else if (x > end) { x = end; } 
            
            imgScrubber.style.left = x + 'px';
            imgTop.style.width = x + 'px';

            circleScrubber.classList.add('paused');
        } else {
            circleScrubber.classList.remove('paused');
        }
     });

    // google charts
    google.charts.load('current', { packages: ['wordtree'] });
    google.charts.setOnLoadCallback(renderWordTree);
    let data;
    
    function renderWordTree() {
        data = google.visualization.arrayToDataTable(
            [   ['id', 'childLabel', 'parent', 'size', { role: 'style'}],
                [0, 'Arthropoda', -1, 1, '#10061A'],
                [1, 'Insecta', 0, 1, '#10061A'],
                [2, 'Coleoptera', 1, 1, '#10061A'],
                [3, 'Harmonia Axyridis', 2, 1, '#CF9893'],

                [4, 'Coccinella 22-Punctata', 2, 1, '#10061A'],

                [5, 'Chrysomela Cerealis', 2, 1, '#10061A'],

                [6, 'Lepidoptera', 1, 1, '#10061A'],
                [7, 'Gonepteryx Merula', 6, 1, '#10061A'],
                [8, 'Vanessa Cardui', 6, 1, '#10061A'],
                
                [9, 'Nymphalis Phoroys', 6, 1, '#10061A']  
          ]
        );

        let options = {
            colors: ['#10061A', '#10061A', '#10061A'],
            backgroundColor: 'transparent',
            fontName: 'Open Sans', 
            wordtree: {
                format: 'explicit',
                type: 'suffix'
            }
        };

        let wordTreeVis = new google.visualization.WordTree(document.querySelector('.wordTree'));
        wordTreeVis.draw(data, options);
    }

// diet
let dietCon = document.querySelector('.dietCon');
for(let i = 0; i < 200; i++) {
    for(let j = 0; j < 25; j++) {
        let box = document.createElement('div');
        box.classList.add('dietBox');
        dietCon.appendChild(box);
        dietTimeline.fromTo(box, 0.05, { opacity: 0 }, { opacity: 1, ease: SLOW_EASE });
    }
}

})();