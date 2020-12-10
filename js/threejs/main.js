import { World } from './classes/World.js';

async function main() {
    const container = document.querySelector('.visContainer');
    const world = new World(container);
    // await world.init();
    
    world.start(); 
}

main().catch((err) => {
    console.error(err);
});

const DAT_GUI = document.querySelector('#datGui');

// show dat GUI on scroll to .visContainer
gsap.fromTo(DAT_GUI, 3, { opacity: 0 }, { scrollTrigger: ".visContainer", opacity: 1, ease: "slow(0.7, 0.7, false)" });