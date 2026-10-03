// Interactive Scene
// Filip Dulic
// Sept 22, 2026
//
// - https://www.youtube.com/watch?v=XOk0aGwZYn8 <- used to understand atan2
// Extra for Experts:
// - Used the mousewheel to change sizes, new functions like atan2 which I watched a video on, 
// I used arc to draw smiles, frowns, and eyebrows.
// 

const CALM = "calm";
const ANNOYED = "annoyed";
const ANGRY = "angry";
const CALM_TEXT = "Pretty nice day today.";
const ANNOYED_TEXT = "Ouch! That hurt.";
const ANGRY_TEXT = "I have had enough!";
let eyeSize, pupilSize, headWidth, headHeight, mouthY,
  leftEyeX, rightEyeX, yForEyes, strokeSize;
let globalSize = 80;
let state = CALM;
let bgColor = 220;
let textSentence = CALM_TEXT;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER);
  updateAllSizes();
  
}

function draw() {
  background(bgColor);
  drawFace();
  drawEye(leftEyeX, yForEyes);
  drawEye(rightEyeX, yForEyes);
  showText();
  
  
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
  //Draw head
  circle(width/2, height/2, headWidth);
  if (state === CALM){
    textSentence = CALM_TEXT;
    // Draw smile
    arc(width/2, height/2 + mouthY , headWidth, headHeight, 20, 160);
    
    // Left eyebrow
    arc(leftEyeX, yForEyes - (eyeSize/4 + eyeSize/16), headWidth/4, headHeight/3, 180, 0);
    
    // Right eyebrow
    arc(rightEyeX, yForEyes - (eyeSize/4 + eyeSize/16), headWidth/4, headHeight/3, 180, 0);
  }
  if (state === ANNOYED){
    textSentence = ANNOYED_TEXT;
    
    //Draw frown
    arc(width/2, height/2 + eyeSize *2 , headWidth, headHeight, 200, 340);
    
    // Left eyebrow
    line(leftEyeX - eyeSize/2, yForEyes - eyeSize/2, leftEyeX + eyeSize / 2, yForEyes - eyeSize);
    // Right eyebrow
    line(rightEyeX - eyeSize/2, yForEyes - eyeSize, rightEyeX + eyeSize / 2, yForEyes - eyeSize/2);
  }
  if (state === ANGRY){
    textSentence = ANGRY_TEXT;
    // frown
    arc(width/2, height/2 + eyeSize *2 , headWidth, headHeight, 200, 340);
    // Left eyebrow
    line(leftEyeX - eyeSize/2, yForEyes - eyeSize, leftEyeX + eyeSize/2, yForEyes - eyeSize/2);
    // Right eyebrow
    line(rightEyeX - eyeSize/2, yForEyes - eyeSize/2, rightEyeX + eyeSize / 2, yForEyes - eyeSize);
    // Makes background red
    bgColor = "red";
    
  }
}
function updateAllSizes(){
  // Adjusts all variables when globalSize changes
  eyeSize = globalSize;
  pupilSize = globalSize/2 - globalSize/10;
  headWidth = globalSize * 5;
  headHeight = headWidth/2;
  mouthY = globalSize / 4;
  
  leftEyeX = width/2 - globalSize;
  rightEyeX = width/2 + globalSize;
  yForEyes = height/2;
  strokeSize = globalSize / 20;
  strokeWeight(strokeSize);
  
}
function mousePressed(){
  // checks if your cursor is over one of the eyes when you click
  let onLeftEye = dist(mouseX, mouseY, leftEyeX, yForEyes) <= eyeSize/2;
  let onRightEye = dist(mouseX, mouseY, rightEyeX, yForEyes) <= eyeSize/2;
  if (onLeftEye || onRightEye){
    if (state === CALM){
      state = ANNOYED;
    }
    else if (state === ANNOYED){
      state = ANGRY;
    }
  }
}

function mouseWheel(event){
  if (keyIsDown("s")){
    //If scrolling down
    if (event.delta > 0){
      globalSize -= 5;
    }
    else {
      //if scrolling up
      globalSize += 5;
    }
  }
  globalSize = constrain(globalSize, 20, 125);
  updateAllSizes();
  return false;
}
function keyPressed(){
  if (key === "c"){
    if (state === ANNOYED){
      state = CALM;
    }
    else if (state === ANGRY){
      state = ANNOYED;
      bgColor = 220;
    }
  }
}
function showText(){
  textSize(width/35);
  fill(0);
  text(textSentence, width/2, height/10);
  textSize(width/75);
  text("Hold the 'S' key while scrolling up/down to change the size", width/9, height/4, width/4, height/4);
  text("Click the 'C' key to calm him down.", width/10, height/3, width/4, height/4);
  text("Do not poke his eyes...", width/10, height/2.5, width/4, height/4);  
}