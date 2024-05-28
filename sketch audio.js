let song;
let amp;
let button;
let rotationAngle = 0;  // Variable to store the rotation angle
let isPlaying = false;  // Variable to track if the song is playing
let previousTime = 0;  // Variable to track previous time when paused

function preload() {
  // Load the sound file
  song = loadSound('assets/music.wav',loaded);
}

function loaded() {
  song.loop(); // Set the song to loop after loading
}

function setup() {
  createCanvas(windowWidth, windowHeight);// Create a canvas that fits the window size
  noLoop();

  button = createButton('Play/Pause');
  positionButton();
  button.mousePressed(play_pause);
  
  // Create an amplitude analyzer
  amp = new p5.Amplitude();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized
  positionButton();// Reposition the button when the window is resized
}

function positionButton() {
  button.position((width - button.width) / 2, height - button.height - 10); // Position button at the center-bottom
}
//learn from https://www.youtube.com/watch?v=SfA5CghXw18
function play_pause() {
  if (!isPlaying) {
    song.play();
    song.jump(previousTime); // Continue from the last paused time
    loop(); // Start the draw loop
    isPlaying = true;
  } else {
    song.pause();
    noLoop(); // Stop the draw loop
    isPlaying = false;
    previousTime = song.currentTime();  // Save the current time when paused
  }
  
}

function draw() {
  background(0, 85, 128);
  let numCircles = 5; // Number of circles on the diagonal
  let baseCircleSize = sqrt(sq(width) + sq(height)) / numCircles; // Base diameter of circles

  // Get the current amplitude level
  let level = amp.getLevel();
  let scaleLevel = map(level, 0, 1, 0.3, 3); // Scale the amplitude level
  let rotationSpeed = map(level, 0, 1, 0, 0.5); // Scale rotation speed based on amplitude
  let zigzagLevel = map(level, 0, 1, 0.8, 2); 
  let circleLevel = map(level, 0, 1, 1, 1.5); 

  // Update the rotation angle
  rotationAngle += rotationSpeed;

  // Draw circles on the diagonal
  for (let i = 0; i < numCircles; i++) {
    let posX = (i + 1) * (baseCircleSize * 0.5) + i * (baseCircleSize * 0.25);
    let posY = posX;
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(posX, posY, circleSize);
    drawEllipsesAroundCircle(posX, posY, baseCircleSize); // Use baseCircleSize for ellipses
    drawSurroundingCircles(posX, posY, 15, numCircles, baseCircleSize);
    drawFilledSurroundingCircles(posX, posY, baseCircleSize*circleLevel);//baseCircleSize*circleLevel determines the diameter or radius of these small circles, and their size is adjusted according to the value of circleLevel.
    drawExtendingLine(posX, posY, circleSize);
  }

  // Draw circles above the diagonal
  for (let j = 0; j < numCircles - 1; j++) {
    let upperCircleX = j * (baseCircleSize * 0.80) + (baseCircleSize * 1.55);
    let upperCircleY = j * (baseCircleSize * 0.80) + (baseCircleSize * 0.15);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(upperCircleX, upperCircleY, circleSize);
    drawEllipsesAroundCircle(upperCircleX, upperCircleY, baseCircleSize); // Use baseCircleSize for ellipses
    drawSurroundingCircles(upperCircleX, upperCircleY, 20, numCircles, baseCircleSize);
    if (j == 1 || j == 2){
      drawFilledSurroundingCircles(upperCircleX, upperCircleY, baseCircleSize*circleLevel);
    }
    if (j == 0 || j == 3) {
      drawZigzagLines(upperCircleX, upperCircleY, baseCircleSize*zigzagLevel);//baseCircleSize*zigzagLevel determines the size of the zigzagLevel lines, which are adjusted according to the value of ZigzagLevel.
    }
    drawExtendingLine(upperCircleX, upperCircleY, circleSize);
  }

  for (let a = 0; a < numCircles - 2; a++) {
    let upperCircleX1 = a * (baseCircleSize * 0.80) + (baseCircleSize * 2.7);
    let upperCircleY1 = a * (baseCircleSize * 0.80) - (baseCircleSize * 0.125);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(upperCircleX1, upperCircleY1, circleSize);
    drawEllipsesAroundCircle(upperCircleX1, upperCircleY1, baseCircleSize); // Use baseCircleSize for ellipses
    drawSurroundingCircles(upperCircleX1, upperCircleY1, 70, numCircles, baseCircleSize);
    drawFilledSurroundingCircles(upperCircleX1, upperCircleY1, baseCircleSize*circleLevel);
    drawExtendingLine(upperCircleX1, upperCircleY1, circleSize);
  }
  for (let d = 0; d < numCircles - 2; d++) {
    let upperCircleX2 = d * (baseCircleSize * 0.80) + (baseCircleSize * 4.4);
    let upperCircleY2 = d * (baseCircleSize * 0.80) - (baseCircleSize * 0.05);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(upperCircleX2, upperCircleY2, circleSize);
    drawEllipsesAroundCircle(upperCircleX2, upperCircleY2, baseCircleSize); // Use baseCircleSize for ellipses
    drawSurroundingCircles(upperCircleX2, upperCircleY2, 70, numCircles, baseCircleSize);
    drawFilledSurroundingCircles(upperCircleX2, upperCircleY2, baseCircleSize*circleLevel);
    drawExtendingLine(upperCircleX2, upperCircleY2, circleSize);
  }

  // Draw circles below the diagonal
  for (let b = 0; b < numCircles - 1; b++) {
    let lowerCircleX = b * (baseCircleSize * 0.75) + (baseCircleSize * 0.15);
    let lowerCircleY = b * (baseCircleSize * 0.80) + (baseCircleSize * 1.5);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(lowerCircleX, lowerCircleY, circleSize);
    drawEllipsesAroundCircle(lowerCircleX, lowerCircleY, baseCircleSize); // Use baseCircleSize for ellipses
    drawSurroundingCircles(lowerCircleX, lowerCircleY, 55, numCircles, baseCircleSize);
    if (b == 0 || b == 2 || b == 3){
    drawFilledSurroundingCircles(lowerCircleX, lowerCircleY, baseCircleSize*circleLevel);
    }
    if (b == 1) {
      drawZigzagLines(lowerCircleX, lowerCircleY, baseCircleSize*zigzagLevel);
    }
    drawExtendingLine(lowerCircleX, lowerCircleY, circleSize);
  }

  for (let c = 0; c < numCircles - 2; c++) {
    let lowerCircleX1 = c * (baseCircleSize * 0.75) - (baseCircleSize * 0.2);
    let lowerCircleY1 = c * (baseCircleSize * 0.85) + (baseCircleSize * 2.5);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(lowerCircleX1, lowerCircleY1, circleSize);
    drawEllipsesAroundCircle(lowerCircleX1, lowerCircleY1, baseCircleSize); // Use baseCircleSize for ellipses
    drawSurroundingCircles(lowerCircleX1, lowerCircleY1, 100, numCircles, baseCircleSize);
    drawFilledSurroundingCircles(lowerCircleX1, lowerCircleY1, baseCircleSize*circleLevel);
    drawExtendingLine(lowerCircleX1, lowerCircleY1, circleSize);
  }

  for (let e = 0; e < numCircles - 2; e++) {
    let lowerCircleX2 = e * (baseCircleSize * 0.75) - (baseCircleSize * 0.75);
    let lowerCircleY2 = e * (baseCircleSize * 0.85) + (baseCircleSize * 3.5);
    let circleSize = baseCircleSize * scaleLevel; // Adjust circle size based on amplitude
    drawConcentricCircles(lowerCircleX2, lowerCircleY2, circleSize);
    drawEllipsesAroundCircle(lowerCircleX2, lowerCircleY2, baseCircleSize); // Use baseCircleSize for ellipses
    drawSurroundingCircles(lowerCircleX2, lowerCircleY2, 100, numCircles, baseCircleSize);
    drawFilledSurroundingCircles(lowerCircleX2, lowerCircleY2, baseCircleSize*circleLevel);
    drawExtendingLine(lowerCircleX2, lowerCircleY2, circleSize);
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
  let numEllipses = 15;  // Number of ellipses
  let ellipseWidth = circleSize / 19;  
  let ellipseHeight = circleSize / 40; 
  let radius = circleSize / 1.9;  // Distance from ellipses to the circle center

  for (let i = 0; i < numEllipses; i++) {
    let angle = TWO_PI * i / numEllipses + rotationAngle;  // Apply the rotation angle
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
    let layerColor = randomColor(); // Random color for each layer
    for (angle = 0; angle < 360; angle += 10) {
      let rad = radians(angle);
      fill(layerColor); // Set the fill color for each small circle
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
      let rad = radians(angle)+ rotationAngle; // Apply rotation angle
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
  let angle = random(-HALF_PI, HALF_PI)+ rotationAngle; // Random angle range from -π/2 to π/2
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
  return color(random(200,255), random(100,255), random(100,255));
}
