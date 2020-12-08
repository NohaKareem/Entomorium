import { World } from './classes/World.js';

async function main() {
    const container = document.querySelector('#scene-container');
    const world = new World(container);
    await world.init();
    
    world.start(); 
}

main().catch((err) => {
    console.error(err);
});

const DAT_GUI = document.querySelector('#datGui');

// greensock scrollto animation
document.querySelector('.exploreButton').addEventListener("click", _ => {
    TweenLite.to(window, 1.5, {
        scrollTo: {
            y: ".visContainer", 
            offsetY: 1, 
            autoKill: false, 
            ease: "slow(0.7, 0.7, false)"
        }
    });
});

// show dat GUI on scroll to .visContainer
gsap.fromTo(DAT_GUI, 3, { opacity: 0 }, { scrollTrigger: ".visContainer", opacity: 1, ease: "slow(0.7, 0.7, false)" });