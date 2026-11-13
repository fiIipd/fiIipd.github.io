// 2d arrays
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [[0,1],
            [2,3]];

let squareSize = 200;
let squareColor;
async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  showGrid();
  changeColors();
}

function showGrid(){
  for (let y=0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      fill(squareColor);
      square(x*squareSize ,y*squareSize, squareSize);
    }
  }
}

function changeColors(){
  for (let y=0; y < grid.length; y++){
    for (let x = 0; x < grid[y].length; x++){
      if (grid[y][x] === 1){
        squareColor = 'blue';
      }
      else if (grid[y][x] === 0){
        squareColor = 'red';
      }
      else if (grid[y][x] === 2){
        squareColor = 'green';
      }
      else if (grid[y][x] === 3){
        squareColor = 'yellow';

      }
    }
  }
}