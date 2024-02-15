let note1;
let note2;
let note3;
let note4;
let note5;
let note6;
let note7;
let note8;
let rect1, rect2, rect3, rect4, rect5, rect6, rect7, rect8, rect9;
let centerPoints = [];

const socket = io();
let radius = 5;
let balls = [];
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

  for (y=140; y<=400+140; y+=200){
    for (x=530; x<=400+530; x+=200){
      centerPoints.push(x);
      centerPoints.push(y);
    }
  }
}

function draw() {
  background(255,255,255);
  //image(img, 320, 100);

  background("#F4A5ED");
  for (let ball of balls) {
    ball.collide();
    ball.move();
    ball.edgeBounce();
    ball.display();
  }

  noFill();
  noStroke();
  for (let ball of balls) {
    ball.collide();
    ball.move();
    ball.edgeBounce();
    ball.display();
  }
}

function mouseClicked() {
  userStartAudio();
    note1 = random(['Fb4', 'G4', 'A5', 'B4', 'D4', 'Gb4', 'C5', 'G5', 'E4', 'Eb5']);
    let curX = mouseX;
    let curY = mouseY;
    for (i = 0; i < centerPoints.length; i+=2){
      if (curX > centerPoints[i]-100 && curX < centerPoints[i] + 100 && curY > centerPoints[i+1]-100 && curY < centerPoints[i+1] + 100) {
      // it's in the rectangle
      monoSynth1.play(note1, 100, 0, 1);
      }
    }
    balls.push(new Ball(mouseX, mouseY, 255));
    console.log(mouseX + "," + mouseY);
    let data = {
      note: note1,
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
  noStroke();
  balls.push(new Ball(mouseX, mouseY, 100));
  monoSynth2.play(note2, 100, 0, 1);
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
