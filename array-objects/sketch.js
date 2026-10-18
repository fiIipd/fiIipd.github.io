// Arrays and Object Notation
// Filip Dulic
// October 7th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let platforms = {
  x: 25,
  y: 25,
  width: 100,
  height: 50,
}

let player = {
  x : 5,
  width : 50,
  height : 100,
  speed : 3,
}

let onGround, playerY;
let gravity = 0.5;
let jumpForce = player.speed* -4;
let yVelocity = 0;



async function setup() {
  createCanvas(windowWidth, windowHeight);
  playerY = height - (player.width + player.height);
}

function draw() {
  background(220);
  showGround();
  showCharacter();
  moveCharacter();
  applyGravity();
  checkCollisions();


}
function showCharacter(){
  fill(onGround ? "blue" : "red");
  rect(player.x,playerY,player.width,player.height);
}
function showGround(){ 
  fill(0);
  rect(0,height-50, width, 50);
}
function moveCharacter(){
  if (keyIsDown('a')) {
    player.x -= player.speed;
  }
  if (keyIsDown('d')) {
    player.x += player.speed;
  }
  if (keyIsDown(' ')){
    if (onGround){
      // Make it jump/update to go up
      yVelocity = jumpForce;
    }
  }
}
function applyGravity(){
  if (!onGround){
    // Pull downward over time
    yVelocity += gravity;
  }
  // Update y position to make it fall
  playerY += yVelocity;
}
function checkCollisions(){
  // Check if player is on the ground
    onGround = collideRectRect(player.x,playerY,player.width,player.height, 0, height-50, width, 50);

    // Make it so the player does not phase through the floor
    if (onGround){
    yVelocity = 0;
  }
}