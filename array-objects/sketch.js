// Arrays and Object Notation
// Filip Dulic
// October 7th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const ALIVE = "alive";
const DEAD = "dead";
const RIGHT = "right";
const LEFT = "left";
let thePlatforms = [];

let player = {
  x : 5,
  width : 50,
  height : 100,
  speed : 5,
};

let backgroundImg, playerImg, onGround, playerY, touchingPlatform, bottomY,
 lavaY, lavaSound, lavaImg, lavaStartTime,
 rightIdle, leftIdle, rightJump,leftJump,leftRun,rightRun;
let onPlatform = false;
let gravity = 0.5;
let jumpForce = -18;
let yVelocity = 0;
let cameraY = 0;
let jumps = 0;
let lavaSpeed = 0.8;
let lavaStarted = false;
let state = ALIVE;
let direction = RIGHT;



async function setup() {
  createCanvas(windowWidth, windowHeight);
  lavaY = height;
  playerY = height - (player.width + player.height);
  lavaStartTime = millis();
  
  for (let i = 0; i < 7; i++){
    thePlatforms.push({
      x : random(0, width - 200),
      y : height - 150 - i * 90,
      width: 200,
      height: 25,
    });
  }
  backgroundImg = await loadImage('space.jpg');
  playerImg = await loadImage('rightIdle.png');
  rightIdle = await loadImage('rightIdle.png');
  leftIdle = await loadImage('leftIdle.png');
  rightRun = await loadImage('alienRight.png');
  leftRun = await loadImage('alienLeft.png');
  rightJump = await loadImage('rightJump.png');
  leftJump = await loadImage('leftJump.png');
  lavaImg = await loadImage('lava.png');
  lavaSound = await loadSound('lava.wav');
  lavaSound.loop(true);
}

function draw() {
  image(backgroundImg, 0, 0, width, height);
  moveCamera();
  translate(0, -cameraY);

  showGround();
  displayPlatforms();
  showCharacter();
  riseLava();

  moveCharacter();
  applyGravity();
  checkCollisions();
  spawnPlatforms();
  
  
} 
function showCharacter(){
  if (!keyIsDown('a') && !keyIsDown('d') && !keyIsDown(' ') && (onGround || onPlatform)){
    if (direction === RIGHT){
    playerImg = rightIdle;
    }
    else {
      playerImg = leftIdle; 
    }
  }
  image(playerImg, player.x,playerY,player.width,player.height);
}
function showGround(){
  // Spawn a black rectangle as my ground
  fill(0);
  rect(0,height-50, width, 50);
}
function moveCharacter(){
  // If moving left
  if (keyIsDown('a')) {
    player.x -= player.speed;
    playerImg = leftRun;
    direction = LEFT;
  }
  // If moving right
  if (keyIsDown('d')) {
    player.x += player.speed;
    playerImg = rightRun;
    direction = RIGHT;
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
  // Find player bottom
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

  for (let i =thePlatforms.length - 1; i >= 0; i--){
    if (thePlatforms[i].y > cameraY + height){
      thePlatforms.splice(i,1);
    }
  }
}
function displayPlatforms(){
  for (let plat of thePlatforms){
    fill('grey');
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
  // Handle jumping/double jump
  if (key === " ") {
    if (jumps < 2) {
      if (onGround || onPlatform || jumps === 1) {
        yVelocity = jumpForce;
        jumps++;
      }
    }
    // Update character image to match movement
    if (direction === RIGHT){
      playerImg = rightJump;
    }
    else{
      playerImg = leftJump;
    }
  }
}
function riseLava(){
  // Make lava rise after 3 seconds
  if (millis() - lavaStartTime >= 3000){
    lavaStarted = true;
  }
  if (lavaStarted){
    while (lavaSpeed <= 3.5){
      lavaSpeed += 0.008
    }
    lavaY -= lavaSpeed;
  }
  // Show lava
  image(lavaImg, 0, lavaY, width, height * 100); 
  
  if (playerY + player.height >= lavaY){
    fill(0);
    textSize(50);
    text("GAME OVER", width / 2 - 150, cameraY + height / 2);
  }
}
function mousePressed(){
  lavaSound.play();
}