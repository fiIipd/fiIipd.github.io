// Arrays and Object Notation
// Filip Dulic
// October 7th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shape, hit;


async function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(220);

  hit = collideRectCircle(100,100,50,50,mouseX - 800 ,mouseY - 800 ,100);

  if (hit){
    fill("red");
  }
  else{
    fill(0);
  }
  circle(mouseX - 800 ,mouseY - 800 ,100);
  orbitControl();
  box(100,100,50,50);
}
