const SHADOW_TRAILER = 'shadow';
const RANDOM_TRAILER  = 'random';

function clearContainer() {
  document.getElementById("container").innerHTML = ""
}

function createGrid(size = 50) {
  clearContainer();
  
  const SQUARE_BORDER_SIZE = 1;
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
    square.addEventListener('mouseenter', e => setSquareTrail(e.target, SHADOW_TRAILER));
    container.appendChild(square);
  }
}

function getRandomColorValue() {
  return Math.floor(Math.random() * 256);
}

function getRandomColor() {
  return `rgb(${getRandomColorValue()}, ${getRandomColorValue()}, ${getRandomColorValue()})`
}

function setSquareTrail(squareElement, trail) {
  if(trail === SHADOW_TRAILER) {
    squareElement.style.backgroundColor = 'black';
    let opacity = +squareElement.style.opacity || 0;
    opacity += 0.1;
    squareElement.style.opacity = opacity;
  } else if (trail === RANDOM_TRAILER) {
    squareElement.style.backgroundColor = getRandomColor();
  } else {
    squareElement.style.backgroundColor = 'rgb(163, 163, 175)';
  }
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

document.getElementById('grid-size').addEventListener('click', configureGrid);

createGrid(10)