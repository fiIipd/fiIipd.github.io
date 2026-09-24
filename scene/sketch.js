// Interactive Scene
// Filip Dulic
// Sept 22, 2026
//
// Extra for Experts:
// - https://www.youtube.com/watch?v=XOk0aGwZYn8 <- used to understand atan2

let leftEyeX, rightEyeX, yForEyes;
let GLOBAL_SIZE = 80;
let pupilSize = GLOBAL_SIZE/2 - GLOBAL_SIZE/10;
let headSize = GLOBAL_SIZE * 5;
let mouthY = GLOBAL_SIZE / 4;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  leftEyeX = width/2 - GLOBAL_SIZE;
  rightEyeX = width/2 + GLOBAL_SIZE;
  yForEyes = height/2;
  background(220);
  drawFace();

}

async function draw() {
  drawEye(leftEyeX, yForEyes);
  drawEye(rightEyeX, yForEyes);

}
function drawEye(eyeX, eyeY){
  //Saves coordinates before changing
  push();

  //Make white part of eye
  fill("white");
  circle(eyeX, eyeY, GLOBAL_SIZE);

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
  circle(width/2, height/2, headSize);
  arc(width/2, height/2 + mouthY , headSize, headSize/2, radians(20), radians(160));
}
