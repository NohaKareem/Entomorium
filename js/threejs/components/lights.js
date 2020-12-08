import { AmbientLight, HemisphereLight, DirectionalLight } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createLights() {
    const dirlight = new DirectionalLight('white', 2);
    dirlight.position.set(0, 10, 20);
    const amblight = new AmbientLight('white', 3);
    const hemilight = new HemisphereLight('white','grey',2);
    return { amblight, dirlight, hemilight }; 
  }
  
  export { createLights };