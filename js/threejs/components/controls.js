import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

function createOrbitControls(camera, canvas) {
        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true; //always use this!

        controls.tick = () => controls.update(); 
        return controls;
      };
  
  export { createOrbitControls };