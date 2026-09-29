// Interactive Scene
// Filip Dulic
// Sept 22, 2026
//
// Extra for Experts:
// - https://www.youtube.com/watch?v=XOk0aGwZYn8 <- used to understand atan2

const CALM = "calm";
const ANNOYED = "annoyed";
const ANGRY = "angry";
let leftEyeX, rightEyeX, yForEyes, strokeSize;
let globalSize = 80;
let eyeSize = globalSize;
let pupilSize = globalSize/2 - globalSize/10;
let headWidth = globalSize * 5;
let headHeight = headWidth/2;
let mouthY = globalSize / 4;
let state = CALM;
async function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  leftEyeX = width/2 - globalSize;
  rightEyeX = width/2 + globalSize;
  yForEyes = height/2;
  strokeSize = globalSize / 20;
  strokeWeight(strokeSize);
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
  if (state === CALM){
    // Draw smile
    arc(width/2, height/2 + mouthY , headWidth, headHeight, 20, 160);

    // Left eyebrow
    arc(leftEyeX, yForEyes - (eyeSize/4 + eyeSize/16), headWidth/4, headHeight/3, 180, 0);

    // Right eyebrow
    arc(rightEyeX, yForEyes - (eyeSize/4 + eyeSize/16), headWidth/4, headHeight/3, 180, 0);
  }
  else if (state === ANNOYED){
    arc(width/2, height/2 + eyeSize *2 , headWidth, headHeight, 200, 340);

    // Left eyebrow
    line(leftEyeX - eyeSize/2, yForEyes - eyeSize/2, leftEyeX + eyeSize / 2, yForEyes - eyeSize);
    // Right eyebrow
    line(rightEyeX - eyeSize/2, yForEyes - eyeSize, rightEyeX + eyeSize / 2, yForEyes - eyeSize/2);

  }
}
function mousePressed(){
  let distanceFromMouse = dist(mouseX, mouseY, leftEyeX, yForEyes);
  if (state === CALM){
    if (distanceFromMouse <= eyeSize/2){
      state = ANNOYED;
    }
  }
  distanceFromMouse = dist(mouseX, mouseY, rightEyeX, yForEyes);
  if (distanceFromMouse <= eyeSize/2){
    state = ANNOYED;
  }
}
function mouseWheel(event){
  if (keyIsDown("s")){
    if (event.delta > 0){
      console.log("down");
    }
    else {
      console.log("up");
    }
  }
}
function keyPressed(){
  if (key === "c"){
    if (state === ANNOYED){
      state = CALM;
    }
  }
}
