let song;
let amp;
let button;

function preload() {
  // Load the sound file
  //audio from https://music.163.com/#/song?id=1919869538
  song = loadSound('assets/music.wav');
}

function setup() {
  createCanvas(600, 600);
  noLoop();

  button = createButton('Play/Pause');
  button.position(19, 19);
  button.mousePressed(play_pause);
  
  // Create an amplitude analyzer
  amp = new p5.Amplitude();
}

function play_pause() {
  if (song.isPlaying()) {
    song.stop();
    noLoop(); // Stop the draw loop when the song is stopped
  } else {
    //we can use song.play() here if we want the song to play once
    //In this case, we want the song to loop, so we call song.loop()
    song.loop();
    loop(); // Start the draw loop when the song is playing
  }
}

function draw() {
  background(0, 85, 128);
  let numCircles = 5; // Number of circles on the diagonal
  let baseCircleSize = sqrt(sq(width) + sq(height)) / numCircles; // Base diameter of circles

  // Get the current amplitude level
  let level = amp.getLevel();
  let scaleLevel = map(level, 0, 1, 1, 3); // Scale the amplitude level

  // Draw circles on the diagonal
  for (let i = 0; i < numCircles; i++) {
    let posX = (i + 1) * (baseCircleSize * 0.5) + i * (baseCircleSize * 0.25);
    let posY = posX;
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(posX, posY, circleSize);
    drawEllipsesAroundCircle(posX, posY, circleSize);
    drawSurroundingCircles(posX, posY, 15, numCircles, circleSize);
    drawFilledSurroundingCircles(posX, posY, circleSize);
    drawExtendingLine(posX, posY, circleSize);
  }

  // Draw circles above the diagonal
  for (let j = 0; j < numCircles - 1; j++) {
    let upperCircleX = j * (baseCircleSize * 0.80) + (baseCircleSize * 1.55);
    let upperCircleY = j * (baseCircleSize * 0.80) + (baseCircleSize * 0.15);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(upperCircleX, upperCircleY, circleSize);
    drawEllipsesAroundCircle(upperCircleX, upperCircleY, circleSize);
    drawSurroundingCircles(upperCircleX, upperCircleY, 20, numCircles, circleSize);
    if (j == 1 || j == 2){
      drawFilledSurroundingCircles(upperCircleX, upperCircleY, circleSize);
    }
    if (j == 0 || j == 3) {
      drawZigzagLines(upperCircleX, upperCircleY, circleSize);
    }
    drawExtendingLine(upperCircleX, upperCircleY, circleSize);
  }

  for (let a = 0; a < numCircles - 2; a++) {
    let upperCircleX1 = a * (baseCircleSize * 0.80) + (baseCircleSize * 2.7);
    let upperCircleY1 = a * (baseCircleSize * 0.80) - (baseCircleSize * 0.125);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(upperCircleX1, upperCircleY1, circleSize);
    drawEllipsesAroundCircle(upperCircleX1, upperCircleY1, circleSize);
    drawSurroundingCircles(upperCircleX1, upperCircleY1, 70, numCircles, circleSize);
    drawFilledSurroundingCircles(upperCircleX1, upperCircleY1, circleSize);
    drawExtendingLine(upperCircleX1, upperCircleY1, circleSize);
  }

  // Draw circles below the diagonal
  for (let b = 0; b < numCircles - 1; b++) {
    let lowerCircleX = b * (baseCircleSize * 0.75) + (baseCircleSize * 0.15);
    let lowerCircleY = b * (baseCircleSize * 0.80) + (baseCircleSize * 1.5);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(lowerCircleX, lowerCircleY, circleSize);
    drawEllipsesAroundCircle(lowerCircleX, lowerCircleY, circleSize);
    drawSurroundingCircles(lowerCircleX, lowerCircleY, 55, numCircles, circleSize);
    if (b == 0 || b == 2 || b == 3){
    drawFilledSurroundingCircles(lowerCircleX, lowerCircleY, circleSize);
    }
    if (b == 1) {
      drawZigzagLines(lowerCircleX, lowerCircleY, circleSize);
    }
    drawExtendingLine(lowerCircleX, lowerCircleY, circleSize);
  }

  for (let c = 0; c < numCircles - 3; c++) {
    let lowerCircleX1 = c * (baseCircleSize * 0.75) - (baseCircleSize * 0.2);
    let lowerCircleY1 = c * (baseCircleSize * 0.85) + (baseCircleSize * 2.5);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(lowerCircleX1, lowerCircleY1, circleSize);
    drawEllipsesAroundCircle(lowerCircleX1, lowerCircleY1, circleSize);
    drawSurroundingCircles(lowerCircleX1, lowerCircleY1, 100, numCircles, circleSize);
    drawFilledSurroundingCircles(lowerCircleX1, lowerCircleY1, circleSize);
    drawExtendingLine(lowerCircleX1, lowerCircleY1, circleSize);
  }
}

// Drawing ellipse function
function drawEllipse(centerX, centerY, ellipseWidth, ellipseHeight, rotation) {
  push();
  translate(centerX, centerY);
  rotate(rotation);
  beginShape();
  for (let i = 0; i < 100; i++) {
    fill(randomColor());
    stroke(255, 117, 26);
    strokeWeight(2);
    let angle = TWO_PI * i / 100;
    let x = ellipseWidth * cos(angle);
    let y = ellipseHeight * sin(angle);
    vertex(x, y);
  }
  endShape(CLOSE);
  pop();
}

// Drawing ellipses around circle
function drawEllipsesAroundCircle(centerX, centerY, circleSize) {
  let numEllipses = 33;  // Number of ellipses
  let ellipseWidth = circleSize / 19;  
  let ellipseHeight = circleSize / 40; 
  let radius = circleSize / 1.8;  // Distance from ellipses to the circle center

  for (let i = 0; i < numEllipses; i++) {
    let angle = TWO_PI * i / numEllipses;
    let ellipseCenterX = centerX + radius * cos(angle);
    let ellipseCenterY = centerY + radius * sin(angle);
    let rotation = angle + HALF_PI;  // Rotate ellipses to make their long axis perpendicular to the circle radius
    drawEllipse(ellipseCenterX, ellipseCenterY, ellipseWidth, ellipseHeight, rotation);
  }
}

// Drawing zigzag lines function
function drawZigzagLines(centerX, centerY, circleSize) {
  let radius = circleSize / 2;
  let numZigzags = 80;
  let angleStep = 360 / numZigzags;

  push();
  stroke(255, 0, 0); 
  noFill();
  strokeWeight(2);

  beginShape();
  for (let i = 0; i <= numZigzags; i++) {
    let angle = radians(i * angleStep);
    let x = centerX + radius * cos(angle);
    let y = centerY + radius * sin(angle);
    vertex(x, y);
    radius = i % 2 === 0 ? circleSize / 2 : circleSize / 4; // Alternate between two radii for zigzag effect
  }
  endShape(CLOSE);
  pop();
}

// Drawing filled surrounding circles function
function drawFilledSurroundingCircles(centerX, centerY, circleSize) {
  let smallCircleSize = circleSize / 25; // Diameter of small circles
  let radius = circleSize / 2 - smallCircleSize / 2 - 2; // Distance from small circles to the circle center
  
  for (let i = 0; i < 5; i++) {
    for (angle = 0; angle < 360; angle += 10) {
      let rad = radians(angle);
      noStroke();
      let x = centerX + (radius - (i * 10)) * cos(rad);
      let y = centerY + (radius - (i * 10)) * sin(rad);
      circle(x, y, smallCircleSize);
    }
  }
}

// Drawing surrounding circles function
function drawSurroundingCircles(centerX, centerY, angle, numCircles, circleSize) {
  let smallCircleSize = circleSize / 15; // Diameter of small circles
  let radius = circleSize / 2 + smallCircleSize / 2 + 2; // Distance from small circles to the circle center

  for (let i = 0; i < numCircles; i++) {
    for (angle; angle < 360; angle += 72) {
      fill(randomColor());
      stroke(0, 0, 0);
      strokeWeight(4);
      let rad = radians(angle);
      let x = centerX + radius * cos(rad);
      let y = centerY + radius * sin(rad);
      circle(x, y, smallCircleSize);
    }
  }
}

// Drawing concentric circles function
function drawConcentricCircles(x, y, size) {
  const layers = random(4, 10); // Random number of layers
  let currentSize = size;

  for (let i = 0; i < layers; i++) {
    stroke(0, 0, 0);
    strokeWeight(random(3));
    fill(randomColor()); // Use random colors
    ellipse(x, y, currentSize, currentSize);
    currentSize *= 0.7; // Decrease size for each layer
  }
}

// Drawing extending line function
function drawExtendingLine(centerX, centerY, circleSize) {
  const HALF_PI = Math.PI / 2;
  let angle = random(-HALF_PI, HALF_PI); // Random angle range from -π/2 to π/2
  let radius = circleSize / 1.6; // Radius is half the diameter of the circle

  let xEnd = centerX + radius * cos(angle);
  let yEnd = centerY + radius * sin(angle);

  let controlX = centerX + radius * 0.4 * cos(angle); // Control point x coordinate is the midpoint between start and end
  let controlY = centerY + radius * 1 * sin(angle); // Control point y coordinate is the same as the center y coordinate

  stroke(255, 20, 147); // Pink color
  strokeWeight(4);

  // Draw a curve, starting from the center of the circle to a point on the circumference, using the control point
  noFill();
  beginShape();
  vertex(centerX, centerY);
  quadraticVertex(controlX, controlY, xEnd, yEnd);
  endShape();
}

// Random color function
function randomColor() {
  return color(random(255), random(255), random(255));
}

