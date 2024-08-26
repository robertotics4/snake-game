// Canvas initialization
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Configurations
const gameConfigurations = {
  canvasSize: canvas.width,
  rectSize: 30,
  generalVelocity: 300,
  grid: {
    lineWidth: 1,
    lineColor: '#191919'
  },
  snake: {
    bodyColor: '#ddd',
    headColor: 'white',
    initialPosition: { x: 270, y: 240 }
  },
  food: {
    shadowSize: 6
  }
};

// functions
function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomPosition(gameConfigurations) {
  const { canvasSize, rectSize } = gameConfigurations;
  const num = randomNumber(0, canvasSize - rectSize);
  return Math.round(num / rectSize) * 30;
}

function randomColor() {
  const red = randomNumber(0, 255)
  const green = randomNumber(0, 255)
  const blue = randomNumber(0, 255)
  return `rgb(${red}, ${green}, ${blue})`
}

function drawSnake(snake, gameConfigurations) {
  const { snake: snakeConfigurations, rectSize } = gameConfigurations;

  ctx.fillStyle = snakeConfigurations.bodyColor;

  snake.forEach((position, index) => {
    if (index === snake.length - 1) {
      ctx.fillStyle = snakeConfigurations.headColor;
    }

    ctx.fillRect(position.x, position.y, rectSize, rectSize);
  });
}

function moveSnake(snake, gameConfigurations) {
  const { rectSize } = gameConfigurations;

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

function drawGrid(gameConfigurations) {
  const { grid, canvasSize } = gameConfigurations;
  ctx.lineWidth = grid.lineWidth;
  ctx.strokeStyle = grid.lineColor;

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

function drawFood(food, gameConfigurations) {
  const { food: foodConfigurations, rectSize } = gameConfigurations;
  const { x, y, color } = food;

  ctx.shadowColor = color;
  ctx.shadowBlur = foodConfigurations.shadowSize;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, rectSize, rectSize);
  ctx.shadowBlur = 0;
}

function runGameLoop(gameConfigurations) {
  const { canvasSize, generalVelocity } = gameConfigurations;

  clearInterval(loopId);

  ctx.clearRect(0, 0, canvasSize, canvasSize);

  drawGrid(gameConfigurations);
  drawFood(food, gameConfigurations);
  moveSnake(snake, gameConfigurations);
  drawSnake(snake, gameConfigurations);

  loopId = setTimeout(() => {
    runGameLoop(gameConfigurations)
  }, generalVelocity);
}

// define objects
let direction, loopId;
const snake = [gameConfigurations.snake.initialPosition];
const food = {
  x: randomPosition(gameConfigurations),
  y: randomPosition(gameConfigurations),
  color: randomColor()
};


runGameLoop(gameConfigurations);

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