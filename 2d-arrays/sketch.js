// 2d arrays
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [['blue','red'],
            ['green', 'yellow']];

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
      square(x*squareSize ,y*squareSize, squareSize);
    }
  }
} 

function mousePressed(){
  let x = Math.floor(mouseX/squareSize);
  let y = Math.floor(mouseY/squareSize);
  console.log(x,y);
}