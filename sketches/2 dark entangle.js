let dice = [];
const amount = 5;
const moveSpeed = 5;
const bgColor = 38;
let size;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  noLoop();

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
    fill(bgColor, 10);
    let strokeColor = color(
      this.color == "red" ? color("#ef4444") : color("#0ea5e9")
    );
    strokeWeight(1);
    for (let i = 0; i < random(10, 500); i++) {
      strokeColor.setAlpha(random(5, 255));
      stroke(strokeColor);
      circle(
        this.x + random(-10, 10),
        this.y + random(-10, 10),
        random(this.diameter - 10, this.diameter + 10)
      );
    }

    // fill(163, 50);
    noFill();
    stroke(163, 100);
    for (let i = 0; i < 10; i++) {
      circle(
        this.x + random(-3, 3),
        this.y + random(-3, 3),
        random(this.diameter / 10 - 3, this.diameter / 10 + 3)
      );
    }
  }

  connect(other) {
    let d = dist(this.x, this.y, other.x, other.y);

    let newThisX = this.x + ((this.diameter - 10) / d) * (other.x - this.x);
    let newThisY = this.y + ((this.diameter - 10) / d) * (other.y - this.y);

    let newOtherX = other.x + ((this.diameter - 10) / d) * (this.x - other.x);
    let newOtherY = other.y + ((this.diameter - 10) / d) * (this.y - other.y);

    stroke(163, 50);
    strokeWeight(4);
    push();
    drawingContext.setLineDash([2, 20]);
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
