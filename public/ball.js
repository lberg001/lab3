class Ball {
  constructor(xpos, ypos, color) {
    this.position = createVector(xpos, ypos);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector(0, 0);
    this.letter = this.getRandomLetter();
    this.textSize = 13;
    this.r = this.textSize / 2;
    this.color = color;
  }

  getRandomLetter() {
    let letters =
      "🐶 🐱 🐭 🐹 🐼 🐻 🦊 🐰 🐻‍❄️ 🐨 🐯 🦁 🐸 🐽 🐷 🐮 🐵 🐔 🐧 🐦 🪿 🐥 🐣 🐤 🦆 🐦‍⬛ 🦅 🦉 🐴 🐗 🐺 🦇 🦄 🫎 🐝 🪱 🐞 🐌 🦋 🐛 🐜 🦂 🐢 🐍 🦎 🦑 🐙 🦕 🦖 🪼 🦐 🦞 🦀 🐬 🐟 🐠 🐡 🐳 🐋 🦈 🦭 🦓 🦜 🐲 🐉 🐿️ 🐁 🦩 🦢 🦜".split(
        " "
      );
    return random(letters);
  }

  display() {
    textSize(this.textSize);
    noStroke();
    fill(this.color);
    text(this.letter, this.position.x, this.position.y);
  }

  move() {
    this.acceleration.add(gravity); // 将重力加到加速度上
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // 重置加速度
    this.velocity.mult(friction);
  }

  collide() {
    for (let other of balls) {
      if (other !== this) {
        let d = dist(
          this.position.x,
          this.position.y,
          other.position.x,
          other.position.y
        );
        let minDist = this.r + other.r;

        if (d < minDist) {
          let angle = atan2(
            this.position.y - other.position.y,
            this.position.x - other.position.x
          );
          let force = p5.Vector.fromAngle(angle);
          force.mult(spring);
          force.mult(0.01);
          this.acceleration.sub(force);
          other.acceleration.add(force);

          let overlap = minDist - d;
          let displacement = p5.Vector.fromAngle(angle).mult(overlap * 0.1);
          this.position.add(displacement);
          other.position.sub(displacement);
        }
      }
    }
  }

  edgeBounce() {
    if (this.position.x > width - this.r) {
      this.position.x = width - this.r;
      this.velocity.x *= -1;
    } else if (this.position.x < this.r) {
      this.position.x = this.r;
      this.velocity.x *= -1;
    }
    if (this.position.y > height - this.r) {
      this.position.y = height - this.r;
      this.velocity.y *= -1;
    } else if (this.position.y < this.r) {
      this.position.y = this.r;
      this.velocity.y *= -1;
    }
  }
}
