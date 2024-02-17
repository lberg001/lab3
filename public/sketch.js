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
<<<<<<< Updated upstream
let font;
var canvas;
=======
let emoX = -20,
  emoY = -20;

>>>>>>> Stashed changes
let img;
function preload() {
<<<<<<< Updated upstream
  font = loadFont("Minecraftia-Regular.ttf");
  img = loadImage('face.jpeg');
=======
  img = loadImage("face.jpeg");
  let emoji = loadJSON("emojis.json");
  emojiDisplay = new EmojiDisplay(emoji);
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  textFont(font);
  for (i=0; i<9; i++) {
    synths.push(new p5.MonoSynth());
=======

  for (i = 0; i < 9; i++) {
    newSynth = new p5.MonoSynth(); // we make an array of synths and notes, one per each face
    synths.push(newSynth);
    synths.push(0); // this is needed because the array is later read in a loop that moves in +=2
>>>>>>> Stashed changes
    notes.push(note);
  }

<<<<<<< Updated upstream
  for (y=140; y<=400+140; y+=200){
    for (x=530; x<=400+530; x+=200){
=======
  for (
    y = (windowHeight - img.height) / 2 + 100;
    y <= (windowHeight + 3 * img.height) / 2;
    y += 187
  ) {
    // determining the center points of each face to display the emojis
    for (
      x = (windowWidth - img.width) / 2 + 100;
      x <= (windowWidth + 3 * img.width) / 2;
      x += 187
    ) {
>>>>>>> Stashed changes
      centerPoints.push(x);
      centerPoints.push(y);
    }
  }
}

function draw() {
<<<<<<< Updated upstream
=======
  background(255);
  image(img, (windowWidth - img.width) / 2, (windowHeight - img.height) / 2); //making sure the image is always centered
>>>>>>> Stashed changes

  image(img, 320, 100);
  for (let ball of balls) {
    ball.collide();
    ball.move();
    ball.edgeBounce();
    ball.display();
  }

<<<<<<< Updated upstream
  noFill();
  noStroke();
  for (let ball of balls) {
    ball.collide();
    ball.move();
    ball.edgeBounce();
    ball.display();
=======
  emo = emojiDisplay.displayEmojiCategory("Animals-Nature");
  if (mouseIsPressed) {
    topic = floor(random(emo.length - 1));
    emojiDisplay.draw(emo[topic], emoX, emoY);
>>>>>>> Stashed changes
  }
}

function mouseClicked() {
  userStartAudio();
<<<<<<< Updated upstream
    let curX = mouseX;
    let curY = mouseY;
    for (i = 0; i < centerPoints.length; i+=2){
      if (curX > centerPoints[i]-100 && curX < centerPoints[i] + 100 && curY > centerPoints[i+1]-100 && curY < centerPoints[i+1] + 100) {
      // it's in the rectangle
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
    };
    // send the mouse data to the server by using name "mouse"
    socket.emit("mouse", data);
=======
  for (i = 0; i < centerPoints.length; i += 2) {
    // here we check which face was clicked, if any
    if (
      mouseX > centerPoints[i] - 100 &&
      mouseX < centerPoints[i] + 100 &&
      mouseY > centerPoints[i + 1] - 100 &&
      mouseY < centerPoints[i + 1] + 350
    ) {
      emoX = centerPoints[i];
      emoY = centerPoints[i + 1];
      notes[i] = random([
        "Fb4",
        "G4",
        "A5",
        "B4",
        "D4",
        "Gb4",
        "C5",
        "G5",
        "E4",
        "Eb5",
      ]);
      synths[i].play(notes[i], 100, 0, 2); // the synth that responds to the face that was clicked plays a random note
    }
  }

  balls.push(new Ball(mouseX, mouseY, 255));
  console.log(mouseX + "," + mouseY);
  let data = {
    // we pass through the socket information about the sounds and emojis
    note: notes[i],
    x: mouseX,
    y: mouseY,
    // topic: topic,
    emoX: emoX,
    emoY: emoY,
    emoji: emo[topic],
  };

  socket.emit("mouse", data);
>>>>>>> Stashed changes
}

function keyPressed() {
  // let randomHue = random(60);
  // currentColor = color(randomHue, 60, 50);
}

socket.on("drawing", (data) => {
  console.log(data);

  onDrawingEvent(data);
});

function onDrawingEvent(data) {
<<<<<<< Updated upstream
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
=======
  balls.push(new Ball(data.x, data.y, 100));
  // synths[i].play(note, 100, 0, 1);
  // topic = floor(random(emo.length - 1));
  fill(0);
  circle(data.emoX, data.emoY, 20);
>>>>>>> Stashed changes
}
