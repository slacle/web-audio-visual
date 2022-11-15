let dice = [];
const amount = 5;
const moveSpeed = 5;
const bgColor = 222;
let size;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  // noLoop();

  size = windowHeight / 8;

  for (let i = 0; i < amount; i++) {
    const x = floor(random(size, width - size));
    const y = floor(random(size, height - size));
    const number = ceil(random(6));
    const color = number % 2 ? "red" : "blue";

    dice[i] = new Die(x, y, number, color);
  }
}

function draw() {
  background(bgColor);

  let colorPresent = dice[0].color;
  if (dice.every((die) => die.color === colorPresent)) {
    dice[1].color = colorPresent == "blue" ? "red" : "blue";
  }

  for (let die of dice) {
    for (let other of dice) {
      if (die.color != other.color) die.connect(other);

      if (die != other && die.intersects(other)) {
        die.move(other);
      }
    }
  }

  for (let die of dice) {
    die.show();
  }
}

class Die {
  constructor(x, y, number, color) {
    this.x = x;
    this.y = y;
    this.number = number;
    this.diameter = size + size * (this.number / 10);
    this.color = color;
  }

  show() {
    fill(bgColor, 200);
    stroke(this.color);
    strokeWeight(this.diameter / 4);
    circle(this.x, this.y, this.diameter);

    fill(0);
    noStroke();
    circle(this.x, this.y, this.diameter / 5);

    // noStroke();
    // text(this.number, this.x + this.diameter / 5, this.y);
  }

  connect(other) {
    let d = dist(this.x, this.y, other.x, other.y);

    let newThisX = this.x + ((this.diameter - 10) / d) * (other.x - this.x);
    let newThisY = this.y + ((this.diameter - 10) / d) * (other.y - this.y);

    let newOtherX = other.x + ((this.diameter - 10) / d) * (this.x - other.x);
    let newOtherY = other.y + ((this.diameter - 10) / d) * (this.y - other.y);

    stroke(50);
    strokeWeight(2);
    push();
    drawingContext.setLineDash([1, 10]);
    line(newThisX, newThisY, newOtherX, newOtherY);
    pop();
  }

  move(other) {
    if (this.x > other.x) {
      this.x += moveSpeed;
      other.x - +moveSpeed;
    }
    if (this.y > other.y) {
      this.y += moveSpeed;
      other.y - +moveSpeed;
    }
  }

  intersects(other) {
    return (
      dist(this.x, this.y, other.x, other.y) <
      this.diameter + this.diameter / 4 + this.diameter / 2
    );
  }
}
