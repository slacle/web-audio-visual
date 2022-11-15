let dice = [];
const amountOfDice = 8;
const bgColor = 38;
let size;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  // createCanvas(1920, 1080);
  noLoop();

  size = windowHeight / 8;

  background(bgColor);

  for (let i = 0; i < 1000; i++) {
    stroke(234, 179, 8, random(1, 20));
    line(
      random(-100, width + 100),
      random(-100, height + 100),
      random(-100, width + 100),
      random(-100, height + 100)
    );
  }

  for (let i = 0; i < amountOfDice; i++) {
    const x = floor(random(size, width - size));
    const y = floor(random(size, height - size));
    const number = ceil(random(6));
    const color = number % 2 ? "red" : "blue";

    dice[i] = new Die(x, y, number, color);
  }
}

function draw() {
  let colorPresent = dice[0].color;
  if (dice.every((die) => die.color === colorPresent)) {
    dice[1].color = colorPresent == "blue" ? "red" : "blue";
  }

  for (let die of dice) {
    for (let other of dice) {
      if (die.color != other.color) die.connect(other);
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
    fill(bgColor, 40);
    let strokeColor = color(
      this.color == "red" ? color("#ef4444") : color("#0ea5e9")
    );
    strokeWeight(1);
    for (let i = 0; i < random(100, 1000); i++) {
      strokeColor.setAlpha(random(5, 255));
      stroke(strokeColor);
      circle(
        this.x + random(-25, 25),
        this.y + random(-25, 25),
        random(this.diameter - 25, this.diameter + 25)
      );
    }

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
    for (let i = 0; i < 3; i++) {
      stroke(234, 179, 8, 40);
      strokeWeight(1);
      line(
        this.x - this.diameter / 2 + i * 10,
        this.y - this.diameter / 2 + i * 10,
        other.x + other.diameter / 2 - i * 10,
        other.y + other.diameter / 2 - i * 10
      );
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    setup();
    draw();
  }
}
