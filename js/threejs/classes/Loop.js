//the 'central animator', it updates the entire scene in start() and repeats endlessly
class LoopUpdater {

  constructor(camera,scene,renderer) {
      this.animate = []; //to-be-animated objects are pushed into this array in World.js
      this.camera = camera;
      this.scene = scene;
      this.renderer = renderer;
  }

  //instead of just render we use a start() method for animations, called in World.js
  //a new method allows us to also call tick() and set up the animation loop
  start() {
      this.renderer.setAnimationLoop(() => {
          this.tick();  //calls the master tick() method below
          this.renderer.render(this.scene, this.camera);
        });
  }
      
  stop() { this.renderer.setAnimationLoop(null); }

  tick() {
      for(const object of this.animate) {
        object.tick();
      }
    }
}
  
export { LoopUpdater };