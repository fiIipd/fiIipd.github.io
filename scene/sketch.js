// Interactive Scene
// Filip Dulic
// Sept 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let button = false;
let x = 50;
let y = 50;
let w = 100;
let h = 75;
async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  if (button){
    background("black");
  }
  rect(x,y,w,h);

}
function mousePressed() {
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    button = !button;
    circle(mouseX,mouseY,30);
  }
}