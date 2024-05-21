console.log("Etch-a-Sketch")
function roundedToFixed(input, digits){
  var rounder = Math.pow(10, digits);
  return (Math.round(input * rounder) / rounder).toFixed(digits);
}

function clearContainer() {
  document.getElementById("container").innerHTML = ""
}

function createGrid(size = 50) {
  const SQUARE_BORDER_SIZE = 1;

  clearContainer();
  
  let container = document.getElementById("container");
  let containerSize = container.clientWidth;
  let squareBorderWidth = `${SQUARE_BORDER_SIZE}px`;
  let squareSize = containerSize / size - SQUARE_BORDER_SIZE * 2;

  for(let i = 0; i < size * size; i++) {
    let square = document.createElement('div');
    let sizePx = squareSize + "px";
    square.style.width = sizePx; 
    square.style['border-width'] = squareBorderWidth;
    square.classList.add('square');
    square.addEventListener('mouseenter',squareTrail);
    container.appendChild(square);
  }
}

function squareTrail(e) {
  e.target.classList.add('shadow');
}

function configureGrid() {
  console.log('configureGrid')
  let gridSize = +prompt('Enter a grid size smaller than 100');
  if(gridSize > 0 && gridSize <= 100) {
    createGrid(gridSize);
  } else {
    configureGrid()
  }
}

document.querySelector('#setup>button').addEventListener('click', configureGrid);


createGrid(10)