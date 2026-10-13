// Collision demo

let hit = false;
let pepsiLogo;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  pepsiLogo = await loadImage('pepsi.png');
  imageMode(CENTER);
}

function draw() {
  background(220);

  hit = collideRectCircle(300,400,200,150, mouseX,mouseY,100);

  if (hit){
    fill('red');
  }
  else{
    fill('black');
  }

  image(pepsiLogo, mouseX, mouseY, 170, 100);
  rect(300,400,200,150);
  // circle(mouseX,mouseY,100);
}
