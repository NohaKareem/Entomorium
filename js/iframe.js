const canvas = document.querySelector("#anatomyIframe");
const context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

const frameCount = 90; //how many still frames do we have

const images = [] //array to hold all of our images

//lets create an object called bugs to hold the current frame
const bugs = {
  frame: 0
};

// const currentFrame = index => (
// `images/bug_explode_${(index + 1).toString().padStart(4, '0')}.jpg`
// );

//lets run a for loop to populate our images array
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  // img.src = currentFrame(i);
            img.src = `images/harmonia/frames/frame${(i + 1).toString().padStart(4, '0')}.jpg`;
            // img.src = `explode/bug_explode_${(i+1).toString().padStart(4, '0')}.jpg`;
  images.push(img);
}

// console.log(images);


//we are not actually animating a DOM element, but rather an object, which contains
//a frame count, as the user scrolls we decrease the value by one
//frameCount starts at 90
//we are animating properties of the bugs object
//even though we are telling frameCount to decrement by 1, the way that greenSock
//and scrolling works is through using decimals, so we have to use built in snap methof
//and pass the frame property so that it snaps to a whole value

gsap.to(bugs, {
  frame: frameCount - 1,
  snap: "frame", //snap to whole numbers or pixel value, //The SnapPlugin allows tweens to “snap” to the closest value in a given array or increment
  //https://greensock.com/docs/v3/GSAP/CorePlugins/SnapPlugin, we are snapping the frame propery value
  //otherwise we get 88.9994
  scrollTrigger: {
    scrub: 0.5
  },
  onUpdate: render //onUpdate part of GS
});
// console.log(frameCount);
// console.log(bugs);

//render is used as a function reference
//parentheses would cause the function to be executed straight away, rather than when event occurs
// We are passing the function as an argument/parameter to the addEventListener() method
//We arew telling the addEventListener() which function to execute when the event is fired.

//when first image is loaded in array, call the render function,
//otherwise we have a blank canvas

images[0].onload = render;

function render() {
  // wipe the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //draw a new frame, using canvas drawImage() method, position 0,0.
//   console.log(bugs.frame);
//   console.log(images[bugs.frame]);
  context.drawImage(images[bugs.frame], 0, 0); 
}