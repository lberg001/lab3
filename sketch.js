let radius = 5;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(255, 0, 0);
  circle(width / 2, height / 2, 50);

  if (MouseIsPressed) {
    circle(mouseX, mouseY, radius);
  }
}
