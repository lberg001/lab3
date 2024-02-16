let rect1, rect2, rect3, rect4, rect5, rect6, rect7, rect8, rect9;
let centerPoints = [];
let synths = [];
let notes = [];
let note;

const socket = io();
let radius = 5;
let balls = [];
let spring = 0.001;
let gravity;
let friction = 0.99;
let currentColor;
let emoX=-20, emoY=-20;

var canvas;
let img;
let topic;

function preload() {
  
  img = loadImage('face.jpeg');
  let emoji = loadJSON("emojis.json");
  emojiDisplay = new EmojiDisplay(emoji);
}

function setup() {
  
  frameRate(60);
  if (windowWidth > windowHeight) {
    canvas = createCanvas(windowWidth, windowWidth);
  } else {
    canvas = createCanvas(windowHeight, windowHeight);
  }
  canvas = createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.05);
  currentColor = color(random(255), random(255), random(255));
 
  for (i=0; i<9; i++) {
    synths.push(new p5.MonoSynth());
    notes.push(note);
  }
  emojiDisplay.setup();

  for (y=140; y<=400+140; y+=200){
    for (x=530; x<=400+530; x+=200){
      centerPoints.push(x);
      centerPoints.push(y);
    }
  }
}

function draw() {
  background(255,255,255);
  image(img, 320, 100);


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
  emo=emojiDisplay.displayEmojiCategory("Animals-Nature");
  if(mouseIsPressed) {
    topic = floor(random(emo.length - 1));
    emojiDisplay.draw(emo[topic],emoX, emoY);
  }
}

function mouseClicked() {
  userStartAudio();
    let curX = mouseX;
    let curY = mouseY;
    for (i = 0; i < centerPoints.length; i+=2){
      if (curX > centerPoints[i]-100 && curX < centerPoints[i] + 100 && curY > centerPoints[i+1]-100 && curY < centerPoints[i+1] + 100) {
      emoX=centerPoints[i];
      emoY=centerPoints[i+1];
      notes[i] = random(['Fb4', 'G4', 'A5', 'B4', 'D4', 'Gb4', 'C5', 'G5', 'E4', 'Eb5']);
      synths[i].play(notes[i], 100, 0, 1);
      }
    }
    balls.push(new Ball(mouseX, mouseY, 255));
    console.log(mouseX + "," + mouseY);
    let data = {
      note: notes[i],
      x: mouseX,
      y: mouseY,
      topic: topic,
      emoX: emoX,
      emoY: emoY,
    };

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
  synths[i].play(note, 100, 0, 1);
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
