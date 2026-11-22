// 2d arrays
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const RED = "red";
const BLUE = "blue";
const GREEN = "green";
const YELLOW = "yellow";


let grid = [[0,0],
            [0, 0]];

let combination = [];
let squareSize = 200;
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
async function setup() {
  firstGrid = "2x2.txt";
  secondGrid = "3x3.txt";
  
  firstGridlines = await loadStrings(firstGrid);
  secondGridLines = await loadStrings(secondGrid);
  
  createCanvas(windowWidth, windowHeight);
  combination.push(RED);
  wordText = RED;
  isFlashing = true;
  flashStep = 0;
  flashTimer = millis();
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
       if (grid[y][x] === 0){
        fill('white');
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
  console.log(x,y);


  if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length){ //Only allow clicking inside of squares
    // If active square is not empty
    if (activeSquare !== null){
      grid[activeSquare.y][activeSquare.x] = 0;
    }
    changeColor(x,y);
  
    activeSquare = {x: x, y: y}; // Make active square wherever you clicked
    flashStartTime = millis();
    correctSquare(x,y);
    if (rightSquare){
      playerStep++;//Next step to click
      if (playerStep >= combination.length){//Check if player clicked through whole combo
        waitingForRound = true;
        roundDelayTime = millis();
      }
    }
    else {
      resetGame();
    }
  }
}

function changeColor(x,y){
  // Check what square is pressed and set the color value for showGrid()
  if (y === 0 && x === 0){
    grid[y][x] = RED;
    squarePicked = RED;
    console.log(RED);
  }
  else if (y === 0 && x === 1){
    grid[y][x] = BLUE;
    squarePicked = BLUE;
    console.log(BLUE);
  }
  else if (y === 1 && x === 0){
    grid[y][x] = GREEN;
    squarePicked = GREEN;
    console.log(GREEN);
  }
  else if (y === 1 && x === 1){
    grid[y][x] = YELLOW;
    squarePicked = YELLOW;
    console.log(YELLOW);
  }
}

function randomCombo(){
  // Choose a random color to push into the combination
  if (rightSquare){
    let nextColor = random([RED, BLUE, GREEN, YELLOW]);
    combination.push(nextColor);
    // Reset variables
    playerStep = 0;
    wordText = nextColor;
    isFlashing = true;
    flashStep = 0;
    flashTimer = millis();
  }
}

function correctSquare(x,y){
  console.log(combination[playerStep]);
  if (grid[y][x] === combination[playerStep]){
    rightSquare = true;
  }
  else {
    rightSquare = false;
  }
}

function checkColorFlashTime(){
  if (activeSquare !== null && millis() - flashStartTime >= flashDuration){
    grid[activeSquare.y][activeSquare.x] = 0;
    activeSquare = null;
  }
}

function resetGame(){
  clearGrid();
  activeSquare = null;
  combination = [];
  playerStep = 0;
  let nextColor = random([RED, BLUE, GREEN, YELLOW]);
  combination.push(nextColor);
  wordText = nextColor;
  isFlashing = true;
  flashStep = 0;
  flashTimer = millis();

}

function flashCombination(){
  if (!isFlashing){
    return null;
  }
  let timeElapsed = millis() - flashTimer;
  let whichColor = combination[flashStep];

  if (timeElapsed < 750){
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
  }
  else if (timeElapsed < 1000){
    clearGrid();
  }
  else {
    flashStep++;
    flashTimer = millis();

    if (flashStep >= combination.length){
      isFlashing = false;
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

function clearGrid(){
  // Resets grid to full white
  grid = [[0,0], [0,0]];
}

function showText(){
  // Shows text with preferences
  fill(0);
  textSize(50);
  text(`${wordText}`, width/2, height/2);
}