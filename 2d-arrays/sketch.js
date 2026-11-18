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
async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  showGrid();
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
  changeColor(x,y);
  randomCombo();
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
  let choice = random(100);
  if (choice < 25){
    combination.push('red');
    // console.log('red');
  }
  else if (choice > 25 && choice < 50){
    combination.push('blue');
    // console.log('blue');
  }
  else if (choice > 50 && choice < 75){
    combination.push('green');
    // console.log('green');
  }
  else if (choice > 75 && choice < 100){
    combination.push('yellow');
    // console.log('yellow');
  }
}