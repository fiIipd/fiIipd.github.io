// Interactive Scene
// Filip Dulic
// Sept 22, 2026
//
// Extra for Experts:
// - https://www.youtube.com/watch?v=XOk0aGwZYn8 <- used to understand atan2

let leftEyeX, yForEyes, rightEyeX;
let eyeSize = 50;
let pupilSize = 20;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  leftEyeX = width/2 - 50;
  rightEyeX = width/2 + 50 ;
  yForEyes = height/2;

}

async function draw() {
  background(220);
  drawEye(leftEyeX,yForEyes);
  drawEye(rightEyeX, yForEyes);

}
async function drawEye(eyeX, eyeY){
  //Saves coordinates before changing
  push();

  //Make white part of eye
  fill("white");
  circle(eyeX, eyeY, eyeSize);

  let xDistance = mouseX - eyeX; //Horizontal distance from the eye center to the mouse X position
  let yDistance = mouseY - eyeY; //Same thing but vertical and mouse Y

  //Make point of rotation the middle of the eye
  translate(eyeX, eyeY);

  let angle = atan2 (yDistance, xDistance) //tells you which direction the mouse is from the eye center
                                    

  //Rotate the pupil around the middle of the eye
  rotate(angle);
  fill("black");
  circle(pupilSize - 5, 0, pupilSize);

  //Restores old coordinates
  pop();
}
