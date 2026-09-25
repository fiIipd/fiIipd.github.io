// Interactive Scene
// Filip Dulic
// Sept 22, 2026
//
// Extra for Experts:
// - https://www.youtube.com/watch?v=XOk0aGwZYn8 <- used to understand atan2

let leftEyeX, rightEyeX, yForEyes;
let GLOBAL_SIZE = 80;
let eyeSize = GLOBAL_SIZE;
let pupilSize = GLOBAL_SIZE/2 - GLOBAL_SIZE/10;
let headWidth = GLOBAL_SIZE * 5;
let headHeight = headWidth/2;
let mouthY = GLOBAL_SIZE / 4;
let state = "calm";
async function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  leftEyeX = width/2 - GLOBAL_SIZE;
  rightEyeX = width/2 + GLOBAL_SIZE;
  yForEyes = height/2;
  background(220);
  
}

async function draw() {
  drawFace();
  drawEye(leftEyeX, yForEyes);
  drawEye(rightEyeX, yForEyes);

}
function drawEye(eyeX, eyeY){
  //Saves coordinates before changing
  push();

  //Make white part of eye
  fill("white");
  circle(eyeX, eyeY, eyeSize);

  let xDistance = mouseX - eyeX; //Horizontal distance from the eye center to the mouse X position
  let yDistance = mouseY - eyeY; //Same thing but vertical and mouse Y

  //Make point of rotation the middle of the eye
  translate(eyeX, eyeY);

  let angle = atan2 (yDistance, xDistance); //tells you which angle the mouse is from the eye center
                                    

  //Rotate the pupil to follow mouse
  rotate(angle);
  fill("black");
  circle(pupilSize - pupilSize/4, 0, pupilSize);

  //Restores old coordinates
  pop();
}
function drawFace(){
  fill(251, 230, 199);
  circle(width/2, height/2, headWidth);
  if (state === "calm"){
    // Draw smile
    arc(width/2, height/2 + mouthY , headWidth, headHeight, PI * 1/9, PI * 8/9);

    // Left eyebrow
    arc(leftEyeX, yForEyes - 25, headWidth/4, headHeight/3, PI, 0);

    // Right eyebrow
    arc(rightEyeX, yForEyes - 25, headWidth/4, headHeight/3, PI, 0);
  }
  else if (state === "angry"){
    arc(width/2, height/2 + eyeSize *2 , headWidth, headHeight, PI * 10/9, PI * 17/9);
    line(leftEyeX - eyeSize/2, yForEyes - eyeSize, leftEyeX + eyeSize / 2, yForEyes - eyeSize/2);
    line(rightEyeX - eyeSize/2, yForEyes - eyeSize/2, rightEyeX + eyeSize / 2, yForEyes - eyeSize);

  }
}
function mousePressed(){
  if (state === "calm"){
    let d = dist(mouseX, mouseY, leftEyeX, yForEyes);
    if (d <= eyeSize/2){
      state = "angry";
    }
    d = dist(mouseX, mouseY, rightEyeX, yForEyes);
    if (d <= eyeSize/2){
      state = "angry";
    }
  }
}