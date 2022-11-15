let dice = [];
let sizeOfDice;
const amountOfDice = 5;
const bgColor = 38;

function setup() {
  // createCanvas(1920, 1080);
  createCanvas(windowWidth, windowHeight - 4);

  noLoop();

  sizeOfDice = windowHeight / 8;

  background(bgColor);

  // create background tangled lines
  for (let i = 0; i < 1000; i++) {
    stroke(234, 179, 8, random(1, 50));
    line(
      random(-100, width + 100),
      random(-100, height + 100),
      random(-100, width + 100),
      random(-100, height + 100)
    );
  }

  // create coordinates of each die, assign color, and add to dice array
  for (let i = 0; i < amountOfDice; i++) {
    const x = floor(random(sizeOfDice, width - sizeOfDice));
    const y = floor(random(sizeOfDice, height - sizeOfDice));
    const number = ceil(random(6));
    const color = number % 2 ? "red" : "blue";

    dice[i] = new Die(x, y, number, color);
  }
}

function draw() {
  // make sure there's at least one of each color
  let colorPresent = dice[0].color;
  if (dice.every((die) => die.color === colorPresent)) {
    dice[1].color = colorPresent == "blue" ? "red" : "blue";
  }

  // connect lines between dice
  for (let die of dice) {
    for (let other of dice) {
      if (die.color != other.color) die.connect(other);
    }
  }

  // display each die in the dice array
  for (let die of dice) {
    die.show();
  }
}

class Die {
  constructor(x, y, number, color) {
    this.x = x;
    this.y = y;
    this.number = number;
    this.diameter = sizeOfDice + sizeOfDice * (this.number / 10);
    this.color = color;
  }

  show() {
    // show outer colored circle
    fill(bgColor, 40);
    let strokeColor = this.color == "red" ? color("#ef4444") : color("#0ea5e9");
    for (let i = 0; i < random(100, 1000); i++) {
      strokeColor.setAlpha(random(5, 255));
      strokeWeight(random(4));
      stroke(strokeColor);
      circle(
        this.x + random(-35, 35),
        this.y + random(-35, 35),
        random(this.diameter - 35, this.diameter + 35)
      );
    }

    // show inner small circle
    noFill();
    for (let i = 0; i < 10; i++) {
      stroke(163, random(40, 70));
      circle(
        this.x + random(-5, 5),
        this.y + random(-5, 5),
        random(this.diameter / 10 - 5, this.diameter / 10 + 5)
      );
    }
  }

  connect(other) {
    for (let i = 0; i < 4; i++) {
      stroke(234, 179, 8, 40);
      strokeWeight(2);
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
