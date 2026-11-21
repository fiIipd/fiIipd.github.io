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
let colorText;
let rightSquare = false;
let i = 0;

let flashStartTime = 0;
let flashDuration = 750;
let activeSquare = null;

let firstGrid;
let firstGridlines;
let secondGrid;
let secondGridLines;
async function setup() {
  firstGrid = "2x2.txt";
  secondGrid = "3x3.txt";
  
  firstGridlines = await loadStrings(firstGrid);
  secondGridLines = await loadStrings(secondGrid);
  
  console.log(firstGridlines);
  console.log(secondGridLines);
  
  createCanvas(windowWidth, windowHeight);
  combination.push(RED);
  colorText = RED;
}

function draw() {
  background(220);
  checkColorFlashTime();
  showGrid();
  fill(0);
  textSize(50);
  text(`${colorText}`, width/2, height/2);
}

function showGrid(){
  for (let y=0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      if (grid[y][x] === BLUE){
        fill(BLUE);
      }
      else if (grid[y][x] === RED){
        fill(RED);
      }
      else if (grid[y][x] === GREEN){
        fill(GREEN);
      }
      else if (grid[y][x] === YELLOW){
        fill(YELLOW);        
      }
      else if (grid[y][x] === 0){
        fill('white');
      }
      square(x*squareSize ,y*squareSize, squareSize);
    }
  }
} 

function mousePressed(){
  let x = Math.floor(mouseX/squareSize);
  let y = Math.floor(mouseY/squareSize);
  console.log(x,y);

  if (x >= 0 && x < grid[0].length && y >= 0 && y < grid.length){
    if (activeSquare !== null){
      grid[activeSquare.y][activeSquare.x] = 0;
    }
    changeColor(x,y);
  
    activeSquare = {x: x, y: y};
    flashStartTime = millis();
    correctSquare(x,y);
    if (rightSquare){
      randomCombo();
    }
    else {
      resetGame();
    }
  }
}

function changeColor(x,y){
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
  if (rightSquare){
    let nextColor = random([RED, BLUE, GREEN, YELLOW]);
    combination.push(nextColor);
    colorText = nextColor;
    i++;
  }
}

function correctSquare(x,y){
  console.log(combination[i]);
  if (grid[y][x] === combination[i]){
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
  combination = [];
  i = 0;
  let nextColor = random([RED, BLUE, GREEN, YELLOW]);
  combination.push(nextColor);
  colorText = nextColor;
  i++;
}