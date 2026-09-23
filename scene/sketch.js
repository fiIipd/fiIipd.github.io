// Interactive Scene
// Filip Dulic
// Sept 22, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let redValue = 255;
let greenValue = 255;
let blueValue = 255;
let isRed = false;
let isGreen = false;
let isBlue = false;
async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  fill(redValue, greenValue, blueValue);
  circle(width/2, height/2, 100);
}
function mouseWheel(event){
  //Scrolling Down
  if (event.delta > 0) {
    if (keyIsDown("r")) {
    console.log("down");
    redValue -= 25
    return false;
    }
    else if (keyIsDown("g")) {
    console.log("down");
    greenValue -= 25;
    return false;   
    }
    else if (keyIsDown("b")) {
    console.log("down");
    blueValue -= 25;
    return false;   
    }   
  }
  //Scrolling Up
  else if (event.delta < 0) {
    if (keyIsDown("r")) {
    console.log("up");
    redValue += 25
    return false;
    }
    else if (keyIsDown("g")) {
    console.log("up");
    greenValue += 25;
    return false;   
    }
    else if (keyIsDown("b")) {
    console.log("up");
    blueValue += 25;
    return false;   
    } 

  }

}