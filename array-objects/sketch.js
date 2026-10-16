// Arrays and Object Notation
// Filip Dulic
// October 7th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let x,y;
let w = 50;
let h = 100;
let speed = 3;



async function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width/2;
  y = height/2;
}

function draw() {
  background(220);
  showCharacter();
  moveCharacter();
function showCharacter(){
  rect(x,y,w,h);
}
function moveCharacter(){
  if (keyIsDown('a')) {
    x -= speed;
  }
  if (keyIsDown('d')) {
    x += speed;
  }

  if (keyIsDown('w')) {
    y -= speed;
  }

  if (keyIsDown('s')) {
    y += speed;
  }  
}