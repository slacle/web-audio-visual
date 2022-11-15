let dice = [];
let sizeOfDice;
const amountOfDice = 9;
const bgColor = 38;

function setup() {
  // createCanvas(1920, 1080);
  createCanvas(windowWidth, windowHeight - 4);

  noLoop();

  sizeOfDice = windowHeight / 8;

  background(bgColor);

  // create background tangled lines
  for (let i = 0; i < 1000; i++) {
    push();
    stroke(234, 179, 8, random(1, 50));
    line(
      random(-100, width + 100),
      random(-100, height + 100),
      random(-100, width + 100),
      random(-100, height + 100)
    );
    pop();
  }

  // create coordinates of each die, assign color, and add to dice array
  for (let i = 0; i < amountOfDice; i++) {
    const x = floor(random(sizeOfDice * 1.5, width - sizeOfDice * 1.5));
    const y = floor(random(sizeOfDice * 1.5, height - sizeOfDice * 1.5));
    const number = ceil(random(6));
    console.log(number);
    const color = number < 3 ? "red" : number > 4 ? "blue" : "green";

    dice[i] = new Die(x, y, number, color);
  }
}

function draw() {
  // make sure there's at least one of each color
  let colorPresent = dice[0].color;
  if (dice.every((die) => die.color === colorPresent)) {
    dice[1].color = colorPresent != "red" ? "red" : "blue";
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
    let strokeColor =
      this.color == "red"
        ? color("#ef4444")
        : this.color == "blue"
        ? color("#0ea5e9")
        : color("#22c55e");
    for (let i = 0; i < 1000; i++) {
      push();
      strokeColor.setAlpha(random(50, 255));
      strokeWeight(random(2));
      stroke(strokeColor);
      translate(this.x + random(-25, 25), this.y + random(-25, 25));
      angleMode(DEGREES);
      rotate(random(360));
      ellipse(
        0,
        0,
        random(this.diameter - 50, this.diameter + 50),
        random(this.diameter - 50, this.diameter + 50)
      );
      pop();
    }

    // show inner small circle
    noFill();
    for (let i = 0; i < 10; i++) {
      push();
      stroke(163, random(40, 70));
      circle(
        this.x + random(-5, 5),
        this.y + random(-5, 5),
        random(this.diameter / 10 - 5, this.diameter / 10 + 5)
      );
      pop();
    }
  }

  connect(other) {
    for (let i = 0; i < 5; i++) {
      push();
      strokeWeight(2);

      let gradient = drawingContext.createLinearGradient(
        this.x - this.diameter / 2 + (this.diameter / 4) * i,
        this.y - this.diameter / 2 + (this.diameter / 4) * i,
        other.x + other.diameter / 2 - (other.diameter / 4) * i,
        other.y + other.diameter / 2 - (other.diameter / 4) * i
      );

      gradient.addColorStop(0, color(234, 179, 8, 80));
      gradient.addColorStop(0.1, color(234, 179, 8, 40));
      gradient.addColorStop(0.5, color(234, 179, 8, 10));
      gradient.addColorStop(0.9, color(234, 179, 8, 40));
      gradient.addColorStop(1, color(234, 179, 8, 80));

      drawingContext.strokeStyle = gradient;

      line(
        this.x - this.diameter / 2 + (this.diameter / 4) * i,
        this.y - this.diameter / 2 + (this.diameter / 4) * i,
        other.x + other.diameter / 2 - (other.diameter / 4) * i,
        other.y + other.diameter / 2 - (other.diameter / 4) * i
      );
      pop();
    }
  }
}

function mousePressed() {
  if (mouseButton === LEFT) {
    setup();
    draw();
  }
}
