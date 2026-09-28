// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

const GREEN = "green";
const YELLOW = "yellow";
const RED = "red";
let state = GREEN;
let lastSwapTime = 0;
let greenLightSwap = 3000;
let yellowLightSwap = 500;
let redLightSwap = 3000;
async function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  chooseCorrectLight();
  drawOutlineOfLights();
  displayTrafficLight();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill(255);
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}
function displayTrafficLight(){
  if (state === GREEN){
    fill(GREEN);
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }
  if (state === YELLOW){
    fill(YELLOW);
    ellipse(width/2, height/2, 50, 50); //middle
  }
  if (state === RED){
    fill(RED);
    ellipse(width/2, height/2 - 65, 50, 50); //top

  }

}
function chooseCorrectLight(){
  if (state === GREEN && (millis() >= lastSwapTime + greenLightSwap)){
    lastSwapTime = millis();
    state = YELLOW;
  }
  if (state === YELLOW && (millis() >= lastSwapTime + yellowLightSwap)){
    lastSwapTime = millis();
    state = RED;
  }
  if (state === RED && (millis() >= lastSwapTime + redLightSwap)){
    lastSwapTime = millis();
    state = GREEN;
  }

}