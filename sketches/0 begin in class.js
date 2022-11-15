const radius = 50;

function setup() {
  createCanvas(windowWidth, windowHeight - 4);
  noLoop();
}

function draw() {
  background(255);
  strokeWeight(20);

  let blue = [];
  let red = [];

  for (let i = 0; i < 5; i++) {
    const w = floor(random(radius, width - radius));
    const h = floor(random(radius, height - radius));

    push();
    if (ceil(random(6)) % 2) {
      stroke(0, 0, 200);
      blue.push([w, h]);
    } else {
      stroke(200, 0, 0);
      red.push([w, h]);
    }
    circle(w, h, radius);
    noStroke();
    fill(0);
    circle(w, h, 10);
    pop();
  }

  for (let b of blue) {
    for (let r of red) {
      stroke(20);
      strokeWeight(3);

      let d = dist(b[0], b[1], r[0], r[1]);

      Bx = b[0] + ((radius + 5) / d) * (r[0] - b[0]);
      By = b[1] + ((radius + 5) / d) * (r[1] - b[1]);

      Rx = r[0] + ((radius + 5) / d) * (b[0] - r[0]);
      Ry = r[1] + ((radius + 5) / d) * (b[1] - r[1]);

      drawingContext.setLineDash([10, 10]);
      line(Bx, By, Rx, Ry);
    }
  }
}
