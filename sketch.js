let radius = 5

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  if(MouseIsPressed) {
    circle(mouseX, mouseY, radius);
    // Hello can you see this?
  }
}