// Arrays and Object Notation
// Filip Dulic
// October 7th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let thePlatforms = [];

let player = {
  x : 5,
  width : 50,
  height : 100,
  speed : 5,
}

let onGround, playerY, touchingPlatform, bottomY;
let onPlatform = false;
let gravity = 0.5;
let jumpForce = player.speed* -3;
let yVelocity = 0;



async function setup() {
  createCanvas(windowWidth, windowHeight);
  playerY = height - (player.width + player.height);
}

function draw() {
  background(220);
  showGround();
  spawnPlatforms();
  displayPlatforms();
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
    if (onGround || onPlatform){
      // Make it jump/update to go up
      yVelocity = jumpForce;
    }
  }
}
function applyGravity(){
  if (!onGround && !onPlatform){
    // Pull downward over time
    yVelocity += gravity;
  }
  // Update y position to make it fall
  playerY += yVelocity;
}
function checkCollisions(){
  bottomY = playerY + player.height;

  onPlatform = false;
  // Check if player is on the ground
    onGround = collideRectRect(player.x,playerY,player.width,player.height, 0, height-50, width, 50);

    for (let platform of thePlatforms){
      touchingPlatform = collideRectRect(player.x, playerY, player.width, player.height, platform.x, platform.y, platform.width, platform.height);
      if (touchingPlatform){
        if (yVelocity > 0 && (bottomY - yVelocity <= platform.y)){
          onPlatform = true;
          yVelocity = 0;
          playerY = platform.y - player.height;
        }
        else if (yVelocity < 0){
          yVelocity = gravity;
          playerY = platform.y + platform.height;
        }
      }
    }    
    // Make it so the player does not phase through the floor
    if (onGround){
    yVelocity = 0;
      playerY = height - (player.width + player.height);
  }
}
function spawnPlatforms(){
  let somePlatform = {
  x: 500,
  y: 770,
  width: 200,
  height: 25,
};
  thePlatforms.push(somePlatform);
}
function displayPlatforms(){
  for (let plat of thePlatforms){
    fill(0);
    rect(plat.x, plat.y, plat.width, plat.height);    
  }
}