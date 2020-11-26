(_ => {
    "use strict";
    
    const LENSES = document.querySelectorAll('.lens');
    const LENS_INFO = document.querySelector('.lensInfo');
    let toggleAlpha = 1;

    // show info box on click
    LENSES.forEach(lens => {
        lens.addEventListener("click", _ => {
            // LENS_INFO.top = lens.top - 10;
            // console.log(document.querySelector('.lens1'))
            // LENS_INFO.left = lens.left - 100;
            // console.log(lens.left)
            gsap.to(LENS_INFO, 1.5, { autoAlpha: toggleAlpha });//~
            toggleAlpha = toggleAlpha ? 0 : 1;
        });
    });
})();