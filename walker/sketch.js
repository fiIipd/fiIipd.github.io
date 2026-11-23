// Walker OOP Demo

class Walker{
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.speed = 15;
    this.diameter = 100;
    this.color = "red";
  }

  display() {
    fill(this.color);
    circle(this.x, this.y, this.diameter);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      //up
      this.y -= this.speed;
    }
    else if (choice < 50){
      //down
      this.y += this.speed;
    }
    else if (choice < 75){
      //left
      this.x -= this.speed;
    }
    else {
      //right
      this.x += this.speed;
    }
  }
}

let deans;
let canvaPro;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  deans = new Walker(width/2, height/2);
  canvaPro = new Walker(300, 400);
  canvaPro.color = 'blue';
  noStroke();
}

function draw() {
  deans.move();
  canvaPro.move();

  
  deans.display();
  canvaPro.display();
}
