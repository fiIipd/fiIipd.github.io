// Arrays and Object Notation
// Filip Dulic
// October 7th 2026
//
// Extra for Experts:
// - Made some simple physics for my platformer, used collide2d mini for all my collisions,
//  I used the Infinity variable to represent a number greater than any other number,
// I used splice to cut out the platforms that were off the screen

// Constants 
const RIGHT = "right";
const PLAYING = "playing";
const MENU = "menu";
const DEAD = 'dead';

// Array to store platforms
let thePlatforms = [];

// Player object to store its info
let player = {
  x : 5,
  width : 50,
  height : 100,
  speed : 5,
};

// Image,sound,collision and player position variables
let backgroundImg, playerImg, onGround, playerY, touchingPlatform, bottomY, playerYell,
  lavaY, lavaSound, lavaImg, lavaStartTime,
  rightIdle, leftIdle, rightJump,leftJump,leftRun,rightRun;

// Physics, game state, collision and tracking variables
let onPlatform = false;
let gravity = 0.5;
let jumpForce = -18;
let yVelocity = 0;
let cameraY = 0;
let jumps = 0;
let lavaSpeed = 0.8;
let lavaStarted = false;
let alive = true;
let direction = RIGHT;
let gameState = MENU;



async function setup() {
  createCanvas(windowWidth, windowHeight);
  // Set variables that need p5js functions
  lavaY = height;
  playerY = height - (player.width + player.height);
  lavaStartTime = millis();
  
  // Create original starting platforms
  for (let i = 0; i < 7; i++){
    thePlatforms.push({
      x : random(0, width - 200), // width-200 so its not on the edge
      y : height - 150 - i * 90, // 90 there to create space
      width: 200,
      height: 25,
    });
  }
  // Load all sounds and images
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
  playerYell = await loadSound('yell.ogg');
}

function draw() {
  // Gamestate checker
  if (gameState === MENU){
    startScreen();
  }
  else if (gameState === PLAYING){
    if(alive){
      image(backgroundImg, 0, 0, width, height);//Space background
      moveCamera();
      translate(0, -cameraY);//Set camera spawn

      showGround();
      displayPlatforms();
      showCharacter();
      riseLava();

      moveCharacter();
      applyGravity();
      checkCollisions();
      spawnPlatforms();      
    }
  } 
  else if (gameState === DEAD){
    endScreen();
  }
} 
function showCharacter(){
  // Check if player is standing still
  if (!keyIsDown('a') && !keyIsDown('d') && !keyIsDown(' ') && (onGround || onPlatform)){
    if (direction === RIGHT){
      // Image to match direction
      playerImg = rightIdle;
    }
    else {
      // New image to match direction
      playerImg = leftIdle; 
    }
  }
  // Show player
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
  // Pull downward over time if in the air
  if (!onGround && !onPlatform){
    yVelocity += gravity;
  }
  // Update y position to make it fall
  playerY += yVelocity;
}
function checkCollisions(){
  // Find player bottom
  bottomY = playerY + player.height;

  // Reset onPlatform
  onPlatform = false;

  // Check if player is on the ground
  onGround = collideRectRect(player.x,playerY,player.width,player.height, 0, height-50, width, 50);

  // Collision with every platform
  for (let platform of thePlatforms){
    touchingPlatform = collideRectRect(player.x, playerY, player.width, player.height, platform.x, platform.y, platform.width, platform.height);
    if (touchingPlatform){
      // Landing on platform
      if (yVelocity >= 0 && bottomY - yVelocity <= platform.y){
        onPlatform = true;
        jumps = 0;
        yVelocity = 0;
        playerY = platform.y - player.height;//Snap to platform top
      }
      // Hitting platform from under
      else if (yVelocity <= 0){
        yVelocity = gravity;
        playerY = platform.y + platform.height; // Snap to platform bottom
      }
    }
  }

  // Make it so the player does not phase through the floor
  if (onGround){
    jumps = 0;
    yVelocity = 0;
    playerY = height - (player.width + player.height);//Set playerY to above ground
  }
}
function spawnPlatforms(){
  let highestY = Infinity; //Using infinity to trac highest platform

  // Checks all platforms in the array
  for (let platf of thePlatforms){
    // Finds highest platform
    if (platf.y < highestY){
      highestY = platf.y; //changes highestY so game never stops climbing
    }
  }

   // Create new platform layout if gap opens up
  if (highestY > cameraY - 200){
    thePlatforms.push({
      x: random(0, width-200),
      y: highestY - random(70,100),
      width: 200,
      height: 25,      
    });
  }

  // Slice platform out if it falls behind screen
  for (let i =thePlatforms.length - 1; i >= 0; i--){
    if (thePlatforms[i].y > cameraY + height){
      thePlatforms.splice(i,1);
    }
  }
}
function displayPlatforms(){
   // Loop through arrays and spawn grey platform blocks
  for (let plat of thePlatforms){
    fill('grey');
    rect(plat.x, plat.y, plat.width, plat.height);    
  }
}
function moveCamera(){
  // Pan view up if player passes middle mark
  if (playerY < cameraY + height/2){
    cameraY = playerY - height/2;
  }
}
function keyPressed() {
  // Handle jumping/double jump
  if (key === " ") {
    // Check if player has jump slots open
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
  // Accelerate lava speed frame by frame
  if (lavaStarted){
    if (lavaSpeed <= 3.5){
      lavaSpeed += 0.008;
    }
    lavaY -= lavaSpeed;
  }
  // Show lava
  image(lavaImg, 0, lavaY, width, height * 100); 
  
  // Trigger game over if lava touches character
  if (playerY + player.height >= lavaY){
    playerYell.play();
    alive = false;
    gameState = DEAD;
    lavaSound.stop();
  }
}
function mousePressed(){
  // Start game from start screen
  if (gameState === MENU){
    gameState = PLAYING;
    lavaStartTime = millis();
    if (!lavaSound.isPlaying()){
      lavaSound.play();
    }
  }
}
function startScreen(){
  background('teal');
  // Text preferences
  textAlign(CENTER,CENTER);
  fill(255);
  
  // Game name
  textSize(50);
  text('SPACE JUMPER', width/2, height/2 - 100);
  
  // How to start text
  textSize(25);
  text('Click anywhere to start', width/2, height/2 - 30);
  
  // Control texts
  textSize(20);
  text('Controls:', width/2, height/2 + 40);
  text('A - Move Left', width/2, height/2 + 70);
  text('D - Move Right', width/2, height/2 + 100);
  text('Spacebar - Jump/Double Jump', width/2, height/2 + 130);
  
}
function endScreen(){
  //Text/background preferences
  background('teal');
  fill(255);
  textSize(50);
  textAlign(CENTER,CENTER);

   // Render game over layout texts
  text('GAME OVER', width/2, height/2 - 100);
  text('Refresh to play again', width/2, height/2 - 30);
}  
