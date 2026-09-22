// Square Moving Around Edge of Screen
let x = 0;
let y = 0;
let speed = 10;
let size = 50;
let state = "right";

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  move();
  display();

  // displaySquare();

  // moveSquare();

  // bounceSquare();

}
function move(){
  if (state === "right") {
    x += speed;
    if (x >= width - size) {
      state = "down";
    }
  }
  else if (state === "down"){
    y += speed;
    if (y >= height - size){
      state = "left";
    }
  }
  else if (state === "left"){
    x -= speed;
    if (x <= 0){
      state = "up";
    }
  }
  else if (state === "up"){
    y -= speed;
    if (y <= 0){
      state = "right";
    }
  }

}

function display(){
  fill(0);
  square(x,y,size);
}
// function moveSquare() {
//   x += xspeed;
// }
// function displaySquare() {
//   fill(0);
//   rect(x,y, w, h);
// }
// function bounceSquare(){
//   if (x >= width - w || x <= 0 + w && (!x===0 && !y===0)) {
//     if (y <= height){
//       xspeed = 0;
//       y += 10;
//     }
//   }

// }