// Arrays and Object Notation
// Filip Dulic
// October 7th 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let shape;


async function setup() {
  shape = await loadModel("uploads_files_2787791_Mercedes+Benz+GLS+580.obj");
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(220);

  orbitControl();
  model(shape);
}
