// Memory Matching game
// Filip Dulic
// November 22 2026
//
// Extra for Experts:
// - I loaded my 2x2 and 3x3 grids from external text files, I explored using .rate() on my sound file so I could get all 9 sounds from 1 file,
// I expanded my knowledge of millis() to make it flash colors and not repeat the sound effects 60 times per second,
//  I used the min() function instead of if/else to find the biggest squares possible,
// Added the option to instantly switch modes and rebuild the grid with new colors

// 2x2 colors
const RED = "red";
const BLUE = "blue";
const GREEN = "green";
const YELLOW = "yellow";
const WHITE = 'white';

// Additional 3x3 colors
const PINK = 'pink';
const BROWN = "brown";
const ORANGE = 'orange';
const CYAN = "cyan";
const PURPLE = 'purple';

let grid = [];

let combination = [];
let squareSize;
let squareColor;
let squarePicked;
let wordText;
let rightSquare = false;
let playerStep = 0;

let isFlashing = true;;
let flashTimer = 0;
let flashStep = 0;
let flashStartTime = 0;
let flashDuration = 750;
let activeSquare = null;

let waitingForRound = false;
let roundDelayTime = 0;

let firstGrid;
let firstGridlines;
let secondGrid;
let secondGridLines;
let currentGridLines;

let score = 0;
let highscore = 0;

let clickSound;
let wrongSound;
let lastFlashedStep = -1;
async function setup() {
  firstGrid = "2x2.txt";
  secondGrid = "3x3.txt";
  
  clickSound = await loadSound('boop.wav');
  wrongSound = await loadSound('buzzer.wav');
  firstGridlines = await loadStrings(firstGrid);
  secondGridLines = await loadStrings(secondGrid);
  
  currentGridLines = firstGridlines;
  clearGrid();
  createCanvas(windowWidth, windowHeight);
  squareSize = min(windowWidth,windowHeight) / grid.length;
  randomCombo();
}

function draw() {
  background(220);
  checkColorFlashTime();
  checkNextRoundDelay();
  flashCombination();
  showGrid();
  showText();
}

function showGrid(){
  // Go through the grid and look at what colors to use
  for (let y=0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      fill(WHITE);
      // ------2x2 colors------
      if (grid[y][x] === BLUE){
        fill(BLUE);
      }
      if (grid[y][x] === RED){
        fill(RED);
      }
       if (grid[y][x] === GREEN){
        fill(GREEN);
      }
       if (grid[y][x] === YELLOW){
        fill(YELLOW);        
      }

      // ----3x3 colors------
      if (grid[y][x] === ORANGE){
        fill(ORANGE);
      }
      if (grid[y][x] === CYAN){
        fill(CYAN);
      }
       if (grid[y][x] === PURPLE){
        fill(PURPLE);
      }
       if (grid[y][x] === PINK){
        fill(PINK);        
      }
       if (grid[y][x] === BROWN){
        fill(BROWN);
      }
       if (grid[y][x] === '0'){
        fill(WHITE);
      }

      // Show the square
      square(x*squareSize ,y*squareSize, squareSize);
    }
  }
} 

function mousePressed(){
  // If colors flashing or waiting for the next round, clicks do nothing
  if (isFlashing || waitingForRound){
    return null;
  }

  // Find where the player is clicking
  let x = Math.floor(mouseX/squareSize);
  let y = Math.floor(mouseY/squareSize);


  if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length){ //Only allow clicking inside of squares
    // If active square is not empty
    if (activeSquare !== null){
      grid[activeSquare.y][activeSquare.x] = '0';
    }
    changeColor(x,y);
  
    activeSquare = {x: x, y: y}; // Make active square wherever you clicked
    flashStartTime = millis();
    correctSquare(x,y);
    if (rightSquare){
      playColorSound(squarePicked);
      playerStep++;//Next step to click
      if (playerStep >= combination.length){//Check if player clicked through whole combo
        waitingForRound = true;
        roundDelayTime = millis();
        wordText = 'Good job!';
        score++;
        if (score > highscore){
          highscore = score;
        }
      }
    }
    else {
      wrongSound.play();
      resetGame();
    }
  }
}

function changeColor(x,y){
  // Check what square is pressed and set the color value for showGrid()

  // ------2x2 colors------
  if (y === 0 && x === 0){//Red
    grid[y][x] = RED;
    squarePicked = RED;
  }
  if (y === 0 && x === 1){//blue
    grid[y][x] = BLUE;
    squarePicked = BLUE;
  }
   if (y === 1 && x === 0){//green
    grid[y][x] = GREEN;
    squarePicked = GREEN;
  }
  if (y === 1 && x === 1){//yellow
    grid[y][x] = YELLOW;
    squarePicked = YELLOW;
    // -----------------
  }

  // ------3x3 colors------
  // Orange
  if (y === 0 && x === 2){
    grid[y][x] = ORANGE;
    squarePicked = ORANGE;
  }
  // Cyan
  if (y === 1 && x === 2){
    grid[y][x] = CYAN;
    squarePicked = CYAN;
  }
  // Purple
  if (y === 2 && x === 0){
    grid[y][x] = PURPLE;
    squarePicked = PURPLE;
  }
  // Pink
  if (y === 2 && x === 1){
    grid[y][x] = PINK;
    squarePicked = PINK;
  }
  // Brown
  if (y === 2 && x === 2){
    grid[y][x] = BROWN;
    squarePicked = BROWN;
  }
}

function randomCombo(){
  let nextColor;
  // Choose a random color to push into the combination based on grid size
  if (grid.length === 2){
    nextColor = random([RED, BLUE, GREEN, YELLOW]);
  }
  if (grid.length === 3){
    nextColor = random([RED, BLUE, GREEN, YELLOW, ORANGE, CYAN, PURPLE, PINK, BROWN]);
  }
  combination.push(nextColor);
  // Reset variables
  playerStep = 0;
  wordText = 'Watch!';
  isFlashing = true;
  flashStep = 0;
  flashTimer = millis();
}

function correctSquare(x,y){
  if (grid[y][x] === combination[playerStep]){
    rightSquare = true;
  }
  else {
    rightSquare = false;
  }
}

function checkColorFlashTime(){
  if (activeSquare !== null && millis() - flashStartTime >= flashDuration){
    grid[activeSquare.y][activeSquare.x] = '0';
    activeSquare = null;
  }
}

function resetGame(){
  clearGrid();
  activeSquare = null;
  score = 0;
  combination = [];
  randomCombo();
}

function flashCombination(){
  if (!isFlashing){
    lastFlashedStep = -1;
    return null;
  }
  let timeElapsed = millis() - flashTimer;
  let whichColor = combination[flashStep];

  if (timeElapsed < 750){
    if (lastFlashedStep !== flashStep){
      playColorSound(whichColor);
      lastFlashedStep = flashStep;
    }

    if (whichColor === RED){
      grid[0][0] = RED;
    }

    if (whichColor === BLUE){
      grid[0][1] = BLUE;
    }
    if (whichColor === GREEN){
      grid[1][0] = GREEN;
    }
    if (whichColor === YELLOW){
      grid[1][1] = YELLOW;
    }
    // ------3x3 colors------
    if (whichColor === ORANGE){
      grid[0][2] = ORANGE;
    }
    if (whichColor === CYAN){
      grid[1][2] = CYAN;
    }
    if (whichColor === PURPLE){
      grid[2][0] = PURPLE;
    }
    if (whichColor === PINK){
      grid[2][1] = PINK;
    }
    if (whichColor === BROWN){
      grid[2][2] = BROWN;
    }
  }
  else if (timeElapsed < 1000){
    clearGrid();
  }
  else {
    flashStep++;
    flashTimer = millis();

    if (flashStep >= combination.length){
      isFlashing = false;
      wordText = 'Your turn!';
    }
  }
}

function checkNextRoundDelay(){
  if (waitingForRound && millis() - roundDelayTime >= 1000){
    waitingForRound = false;
    clearGrid();
    activeSquare = null;
    randomCombo();
  }
}

function clearGrid() {
  grid = []; //Make grid empty
  
  for (let y = 0; y < currentGridLines.length; y++) {
    let row = []; // Create a new empty row
    let line = currentGridLines;
    
    for (let x = 0; x < line.length; x++) {
      row.push(line[y][x]); //Grab each character
    }    
    grid.push(row); //Push row into grid
  }
  squareSize = min(windowWidth,windowHeight) / grid.length;
}


function showText(){
  // Shows text with preferences
  fill(0);
  // Watch!, Good job!, Your turn! text
  textSize(50);
  text(`${wordText}`, grid.length * squareSize + width/10, height/2);

  textSize(30);
  text(`Score: ${score}`, grid.length * squareSize + width/10, height/3);//Score text
  text(`High Score: ${highscore}`,grid.length * squareSize + width/10, height/3.5); // High score text

  // Mode swap instructions
  text("Press 2 for 2x2 mode", grid.length * squareSize + width/10, height/6);
  text("Press 3 for 3x3 mode", grid.length * squareSize + width/10, height/4.5);

}

function keyPressed(){
  if (key === '2'){
    currentGridLines = firstGridlines;
    resetGame();
  }
  if (key === '3'){
    currentGridLines = secondGridLines;
    resetGame();
  }
}

function playColorSound(color) {
  // Give every color a playback speed, so I only use 1 file
  if (color === RED){
    clickSound.rate(0.8);
  }
  
  if (color === BLUE){
    clickSound.rate(0.9);
  }
  if (color === GREEN){
    clickSound.rate(1.0);
  }
  if (color === YELLOW){
    clickSound.rate(1.1);
  }
  if (color === ORANGE){
    clickSound.rate(1.2);
  }
  if (color === CYAN){ 
    clickSound.rate(1.3);
  }
  if (color === PURPLE){ 
    clickSound.rate(1.4);
  }
  if (color === PINK){ 
    clickSound.rate(1.5);
  }
  if (color === BROWN){
    clickSound.rate(1.6)
  }
  if (clickSound.isPlaying()){
    clickSound.stop();
  }
  clickSound.play();
}