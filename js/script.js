// Canvas initialization
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomPosition(canvasSize, rectSize) {
  const num = randomNumber(0, canvasSize - rectSize);
  return Math.round(num / rectSize) * 30;
}

function randomColor() {
  const red = randomNumber(0, 255)
  const green = randomNumber(0, 255)
  const blue = randomNumber(0, 255)
  return `rgb(${red}, ${green}, ${blue})`
}

function drawSnake(snake, rectSize) {
  ctx.fillStyle = defaultBodySnakeColor;

  snake.forEach((position, index) => {
    if (index === snake.length - 1) {
      ctx.fillStyle = defaultHeadSnakeColor;
    }

    ctx.fillRect(position.x, position.y, rectSize, rectSize);
  });
}

function drawGrid(gridLineWidth, gridLineColor, canvasSize) {
  ctx.lineWidth = gridLineWidth;
  ctx.strokeStyle = gridLineColor;

  for (let i = 30; i < canvasSize; i += 30) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, canvasSize);
    ctx.stroke();

    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(600, i);
    ctx.stroke();
  }
}

function drawFood(food, rectSize) {
  const { x, y, color } = food;

  ctx.shadowColor = color;
  ctx.shadowBlur = defaultFoodShadowSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, rectSize, rectSize);
  ctx.shadowBlur = 0;
}

function moveSnake(snake, rectSize) {
  if (!direction) return;

  const head = snake[snake.length - 1];

  if (direction === 'right') {
    snake.push({ x: head.x + rectSize, y: head.y });
  }

  if (direction === 'left') {
    snake.push({ x: head.x - rectSize, y: head.y });
  }

  if (direction === 'down') {
    snake.push({ x: head.x, y: head.y + rectSize });
  }

  if (direction === 'up') {
    snake.push({ x: head.x, y: head.y - rectSize });
  }

  snake.shift();
}

function runGameLoop() {
  clearInterval(loopId);

  ctx.clearRect(0, 0, defaultCanvasSize, defaultCanvasSize);

  drawGrid(defaultGridLineWidth, defaultGridLineColor, defaultCanvasSize);
  drawFood(food, defaultRectSize);
  moveSnake(snake, defaultRectSize);
  drawSnake(snake, defaultRectSize);

  loopId = setTimeout(() => { runGameLoop() }, defaultGameVelocity);
}

// Configurations
const defaultCanvasSize = canvas.width;
const defaultRectSize = 30;
const defaultGameVelocity = 300;
const defaultBodySnakeColor = '#ddd';
const defaultHeadSnakeColor = 'white';
const defaultGridLineWidth = 1;
const defaultGridLineColor = '#191919';
const defaultFoodColor = "yellow";
const defaultFoodShadowSize = 6;

// define objects
let direction, loopId;
const initialSnakePosition = { x: 270, y: 240 };
const snake = [initialSnakePosition];
const food = {
  x: randomPosition(defaultCanvasSize, defaultRectSize),
  y: randomPosition(defaultCanvasSize, defaultRectSize),
  color: randomColor()
};


runGameLoop();

document.addEventListener('keydown', event => {
  const { key } = event;

  if (key === 'ArrowRight' && direction !== 'left') {
    direction = 'right';
  }

  if (key === 'ArrowLeft' && direction !== 'right') {
    direction = 'left';
  }

  if (key === 'ArrowDown' && direction !== 'up') {
    direction = 'down';
  }

  if (key === 'ArrowUp' && direction !== 'down') {
    direction = 'up';
  }
});