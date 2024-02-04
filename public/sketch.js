const socket = io();
let radius = 5;

function setup() {
  if (windowWidth > windowHeight) {
    canvas = createCanvas(windowWidth, windowWidth);
  } else {
    canvas = createCanvas(windowHeight, windowHeight);
  }
  canvas = createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {}

function mouseDragged() {
  console.log(mouseX + "," + mouseY);
  fill(0);
  noStroke();
  circle(mouseX, mouseY, radius);
  let data = {
    x: mouseX,
    y: mouseY,
  };

  // send the mouse data to the server by using name "mouse"
  socket.emit("mouse", data);
}

socket.on("drawing", (data) => {
  console.log(data);

  onDrawingEvent(data);
});

function onDrawingEvent(data) {
  noStroke();
  fill("#6358cc");
  circle(data.x, data.y, radius);
}

function windowResized() {
  //wipes out the history of drawing if resized, potential fix, draw to offscreen buffer
  //https://p5js.org/reference/#/p5/createGraphics
  resizeCanvas(windowWidth, windowHeight);
  //ratio fix... but then need to make a bunch of other UX decisions like whether you zoom into the canvas or center it somehow
  if (windowWidth > windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  } else {
    resizeCanvas(windowHeight, windowHeight);
  }
  background(220);
}
