const SHADOW_TRAILER = 'shadow';
const RANDOM_TRAILER  = 'random';
const DEFAULT_GRID_SIZE = 10;

function clearContainer() {
  document.getElementById("container").innerHTML = ""
}

function setSquareTrail(squareElement, trail) {
  if(trail === SHADOW_TRAILER) {
    squareElement.style['background-color'] = 'black';
    let opacity = +squareElement.style.opacity || 0;
    opacity += 0.1;
    squareElement.style.opacity = opacity;
  } else if (trail === RANDOM_TRAILER) {
    squareElement.style['background-color'] = getRandomColor();
  } else {
    squareElement.style['background-color'] = 'rgb(163, 163, 175)';
  }
}

function createGrid(size = 50, trail) {
  clearContainer();
  
  const SQUARE_BORDER_WIDTH = 1;
  let container = document.getElementById("container");
  let containerSize = container.clientWidth;
  let squareBorderWidth = `${SQUARE_BORDER_WIDTH}px`;
  let squareSize = containerSize / size - SQUARE_BORDER_WIDTH * 2;

  for(let i = 0; i < size * size; i++) {
    let square = document.createElement('div');
    let sizePx = squareSize + "px";
    square.style['width'] = sizePx; 
    square.style['border-width'] = squareBorderWidth;
    square.classList.add('square');
    square.addEventListener('mouseenter', e => setSquareTrail(e.target, trail));
    container.appendChild(square);
  }
}

function getRandomColorValue() {
  return Math.floor(Math.random() * 256);
}

function getRandomColor() {
  return `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`
}

function configureGrid() {
  let gridSize = +prompt('Enter a grid size smaller than 100');
  if(gridSize > 0 && gridSize <= 100) {
    createGrid(gridSize);
  } else if(gridSize === 0) {
    return;
  } else  {
    configureGrid()
  }
}

function configureTrail(trail) {
  let squares = document.querySelectorAll('.square');
  let gridSize = Math.sqrt(squares.length);
  createGrid(gridSize, trail);
}

document.getElementById('grid-size').addEventListener('click', configureGrid);
document.getElementById('setup').addEventListener('click', e => {
  if(e.target.id == 'random-trail') {
    configureTrail(RANDOM_TRAILER)
  } else if(e.target.id == 'shadow-trail') {
    configureTrail(SHADOW_TRAILER)
  } else if(e.target.id == 'reset-trail') {
    configureTrail()
  }
})

createGrid(DEFAULT_GRID_SIZE)