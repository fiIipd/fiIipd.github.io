let colour = "white";
function setup() {
  //Make the largest square you can...
  if (windowWidth > windowHeight){
    createCanvas(windowHeight, windowHeight);
  }
  else {
    createCanvas(windowWidth, windowWidth);
  }

}

function draw() {
  background(220);
  drawChess();
}
function drawChess(){
  for (let x = 0; x < width; x += width/8){
    if (colour === "white"){
      colour = "black";
    }
    else {
      colour = "white";
    }
    for (let y = 0; y < height; y += height/8){
      if (colour === "white"){
        colour = "black";
      }
      else {
        colour = "white";
      }
      fill(colour);
      rect(x,y,width/8,height/8);
    }
  }
}