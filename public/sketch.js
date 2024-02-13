const socket = io();
let radius = 5;
// let balls = [];
let spring = 0.001;
let gravity;
let friction = 0.99;
let currentColor;
let font;
var canvas;
let img;
function preload() {
  font = loadFont("Minecraftia-Regular.ttf");
  img = loadImage('face.jpeg');

  // img = loadImage("1.jpeg", 0, 0);
}

function setup() {
  
  if (windowWidth > windowHeight) {
    canvas = createCanvas(windowWidth, windowWidth);
  } else {
    canvas = createCanvas(windowHeight, windowHeight);
  }
  canvas = createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.05);
  currentColor = color(random(255), random(255), random(255));
  textFont(font);
  monoSynth1 = new p5.MonoSynth();
  monoSynth2 = new p5.MonoSynth();
  monoSynth3 = new p5.MonoSynth();
  monoSynth4 = new p5.MonoSynth();
  monoSynth5 = new p5.MonoSynth();
  monoSynth6 = new p5.MonoSynth();
  monoSynth7 = new p5.MonoSynth();
  monoSynth8 = new p5.MonoSynth();
  monoSynth9 = new p5.MonoSynth();
}

function draw() {
  // background("#F4A5ED");
  // for (let ball of balls) {
  //   ball.collide();
  //   ball.move();
  //   ball.edgeBounce();
  //   ball.display();
  // }
  background(255,255,255);
  image(img, 320, 100);
  for (let ball of balls) {
    ball.collide();
    ball.move();
    ball.edgeBounce();
    ball.display();
  }
}

// function mouseDragged() {
//   console.log(mouseX + "," + mouseY);
//   fill(0);
//   noStroke();
//   circle(mouseX, mouseY, radius);
//   let data = {
//     x: mouseX,
//     y: mouseY,
//   };

function mousePressed() {
  userStartAudio();
  let note = random(['Fb4', 'G4', 'A5', 'B4', 'D4', 'Gb4', 'C5', 'G5', 'E4', 'Eb5']);
  monoSynth1.play(note, 100, 0, 1);
  // balls.push(new Ball(mouseX, mouseY, 255));
  console.log(mouseX + "," + mouseY);
  let data = {
    tone: note,
    x: mouseX,
    y: mouseY,
  };
  // send the mouse data to the server by using name "mouse"
  socket.emit("mouse", data);
}

function keyPressed() {
  let randomHue = random(60);
  currentColor = color(randomHue, 60, 50);
}

socket.on("drawing", (data) => {
  console.log(data);

  onDrawingEvent(data);
});

function onDrawingEvent(data) {
  // noStroke();
  // balls.push(new Ball(mouseX, mouseY, 100));
  monoSynth2.play(note, 100, 0, 1);
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
