// Arrays and Object Notation
// Filip Dulic
// October 7th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ALIVE = "alive";
const DEAD = "dead";
let thePlatforms = [];

let player = {
  x : 5,
  width : 50,
  height : 100,
  speed : 5,
};

let onGround, playerY, touchingPlatform, bottomY, lavaY, lavaSound, lavaImg;
let onPlatform = false;
let gravity = 0.5;
let jumpForce = -18;
let yVelocity = 0;
let cameraY = 0;
let jumps = 0;




async function setup() {
  createCanvas(windowWidth, windowHeight);
  lavaY = height;
  playerY = height - (player.width + player.height);
  
  for (let i = 0; i < 7; i++){
    thePlatforms.push({
      x : random(0, width - 200),
      y : height - 150 - i * 90,
      width: 200,
      height: 25,
    });
  }
  lavaImg = await loadImage('lava.png');
  lavaSound = await loadSound('lava.wav');
  lavaSound.loop(true);
}

function draw() {
  background(220);
  moveCamera();
  displayWorld();
  moveCharacter();
  applyGravity();
  checkCollisions();
  spawnPlatforms();
  
  
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
      if (yVelocity >= 0 && bottomY - yVelocity <= platform.y){
        onPlatform = true;
        jumps = 0;
        yVelocity = 0;
        playerY = platform.y - player.height;
      }
      else if (yVelocity <= 0){
        yVelocity = gravity;
        playerY = platform.y + platform.height;
      }
    }
  }    
  // Make it so the player does not phase through the floor
  if (onGround){
    jumps = 0;
    yVelocity = 0;
    playerY = height - (player.width + player.height);
  }
}
function spawnPlatforms(){
  let highestY = Infinity;
  for (let platf of thePlatforms){
    if (platf.y < highestY){
      highestY = platf.y;
    }
  }

  if (highestY > cameraY - 200){
    thePlatforms.push({
      x: random(0, width-200),
      y: highestY - random(70,100),
      width: 200,
      height: 25,

    });
  }
}
function displayPlatforms(){
  for (let plat of thePlatforms){
    fill(0);
    rect(plat.x, plat.y, plat.width, plat.height);    
  }
}
function moveCamera(){
  if (playerY < cameraY + height/2){
    cameraY = playerY - height/2;
  }
}
function displayWorld(){
  push();
  translate(0, -cameraY);

  showGround();
  displayPlatforms();
  showCharacter();
  riseLava();

  pop();
}
function keyPressed() {
  if (key === " ") {
    if (jumps < 2) {
      if (onGround || onPlatform || jumps === 1) {
        yVelocity = jumpForce;
        jumps++;
      }
    } 
  }
}
function riseLava(){
  lavaY -= 0.8;
  fill('orangered');
  rect(0, lavaY, width, height * 100);
  
  if (playerY + player.height >= lavaY){
    fill(0);
    textSize(50);
    text("GAME OVER", width / 2 - 150, cameraY + height / 2);
  }
}
function mousePressed(){
  lavaSound.play();

}