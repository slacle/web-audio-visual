let bubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight - 4);

  for (let i = 0; i < 50; i++) {
    bubbles[i] = new Bubble(
      random(0, width),
      random(0, height),
      random(15, 18)
    );
  }
}

function draw() {
  background(10);

  for (let bubble of bubbles) {
    bubble.show();
    bubble.move();
  }
}

class Bubble {
  constructor(x, y, s) {
    this.x = x;
    this.y = y;
    this.s = s;
  }

  show() {
    noFill();
    stroke(random(50, 255), random(50, 255), random(50, 255));
    ellipse(this.x, this.y, this.s);
  }

  move() {
    this.x += random(-1, 1);
    this.y += random(-1, 1);
    this.s += random(-1, 1);
  }
}

function mouseDragged() {
  bubbles.push(new Bubble(mouseX, mouseY, random(15, 18)));
}
