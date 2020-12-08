import { SphereBufferGeometry, BoxBufferGeometry,  TextureLoader, Mesh, MeshStandardMaterial } from 'https://unpkg.com/three@0.117.0/build/three.module.js';

function createMaterial() {
  const textureLoader = new TextureLoader();
  const texture = textureLoader.load('./assets/textures/map.jpg');
  const material = new MeshStandardMaterial({ color: 'darkgrey', map: texture, bumpMap: texture });
  return material;
}

function renderGlobe(w=1, h=1, d=1, speed = 0.001) {
    const geometry = new SphereBufferGeometry(w, h, d);
    
    const material = createMaterial();
    const globe = new Mesh(geometry, material);

    globe.tick = () => {
      globe.rotation.y += speed;
    };
    
    return globe;
  }

  export { renderGlobe };