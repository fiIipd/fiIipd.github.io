// 2d arrays
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [[0,0],
            [0, 0]];

let combination = [];
let squareSize = 200;
let squareColor;
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
      if (grid[y][x] === 'blue'){
        fill('blue');
      }
      else if (grid[y][x] === 'red'){
        fill('red');
      }
      else if (grid[y][x] === 'green'){
        fill('green');
      }
      else if (grid[y][x] === 'yellow'){
        fill('yellow');        
      }
      else if (grid[y][x] === 0){
        fill(255);
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
    grid[y][x] = "red";
  }
  else if (y === 0 && x === 1){
    grid[y][x] = "blue";
  }
  else if (y === 1 && x === 0){
    grid[y][x] = "green";
  }
  else if (y === 1 && x === 1){
    grid[y][x] = "yellow";
  }
}

function randomCombo(){
  let choice = random(100);
  if (choice < 25){
    console.log('red');
  }
  else if (choice > 25 && choice < 50){
    console.log('blue');
  }
  else if (choice > 50 && choice < 75){
    console.log('green');
  }
  else if (choice > 75 && choice < 100){
    console.log('yellow');
  }
}