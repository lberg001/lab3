let centerPoints = [];
let synths = [];
let newSynth;
let notes = [];
let note;

const socket = io();
let radius = 5;
let balls = [];
let spring = 0.001;
let gravity;
let friction = 0.99;
let currentColor;
let emo;
let emoX = -20,
  emoY = -20;
let emoXs = [],
  emoYs = [];
let emojis = [];
let moving=[];
let move;

let img;
let imgOriginalWidth;
let imgOriginalHeight;
let topic;

let isMoving = false;

function preload() {
  img = loadImage("face.jpeg", function (loadedImage) {
    imgOriginalWidth = loadedImage.width;
    imgOriginalHeight = loadedImage.height;
  });
  let emoji = loadJSON("emojis.json");
  emojiDisplay = new EmojiDisplay(emoji);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0, 0.05);
  currentColor = color(random(255), random(255), random(255));

  for (i = 0; i < 9; i++) {
    newSynth = new p5.MonoSynth(); // we make an array of synths and notes, one per each face
    synths.push(newSynth);
    synths.push(0); // this is needed because the array is later read in a loop that moves in +=2
    notes.push(note);
    notes.push(0);
  }
  emojiDisplay.setup();
  emo = emojiDisplay.displayEmojiCategory("Animals-Nature");

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
      centerPoints.push(x);
      centerPoints.push(y);
    }
  }
}

function draw() {
  background(255);
  // image(img, (windowWidth - img.width) / 2, (windowHeight - img.height) / 2); //making sure the image is always centered
  let newWidth = windowWidth;
  let newHeight = (imgOriginalHeight / imgOriginalWidth) * newWidth;
  if (newHeight > windowHeight) {
    newHeight = windowHeight;
    newWidth = (imgOriginalWidth / imgOriginalHeight) * newHeight;
  }
  image(
    img,
    (windowWidth - newWidth) / 2,
    (windowHeight - newHeight) / 2,
    newWidth,
    newHeight
  );
  for (let ball of balls) {
    ball.collide();
    ball.move();
    ball.edgeBounce();
    ball.display();
  }

  for (let ball of balls) {
    ball.collide();
    ball.move();
    ball.edgeBounce();
    ball.display();
  }
  push();
  textSize(50);
  console.log(moving[moving.length-1]);
  if(moving[moving.length-1]){
    text(
      emojis[floor(random(emojis.length - 1))],
      emoXs[emoXs.length - 1],
      emoYs[emoYs.length - 1]
    );
  }else{
    text(
      emojis[emojis.length - 1],
      emoXs[emoXs.length - 1],
      emoYs[emoYs.length - 1]
    );
  }

  if(isMoving){
    text(emo[floor(random(emo.length-1))], emoX, emoY);
  }else{
    text(emo[emo.length-1], emoX, emoY);
  }
  pop();
}

function mouseClicked() {
  userStartAudio();
  if (!isMoving) {
    isMoving = true;
    move=true;
  } else {
    isMoving = false;
    move=false;
  }
  topic = floor(random(emo.length - 1));
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
  let data = {
    // we pass through the socket information about the sounds and emojis
    //note: notes[i],
    x: mouseX,
    y: mouseY,
    topic: topic,
    emoji: emo[topic],
    emoX: emoX,
    emoY: emoY,
    move: move,
  };
  socket.emit("drawing", data);
}

socket.on("drawing", (data) => {
  onDrawingEvent(data);
});

function onDrawingEvent(data) {
  noStroke();
  emojis.push(data.emoji);
  emoXs.push(data.emoX);
  emoYs.push(data.emoY);
  balls.push(new Ball(mouseX, mouseY, 100));
  moving.push(data.move);
  //synths[i].play(note, 100, 0, 1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
