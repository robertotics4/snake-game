// Canvas initialization
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Configurations
const defaultCanvasSize = 600;
const defaultRectSize = 30;
const defaultGameVelocity = 300;
const initialPosition = { x: 270, y: 240 };
let direction, loopId;
const snake = [initialPosition];

function drawnSnake(snake, rectSize) {
  ctx.fillStyle = "#ddd";

  snake.forEach((position, index) => {
    if (index === snake.length - 1) {
      ctx.fillStyle = "white";
    }

    ctx.fillRect(position.x, position.y, rectSize, rectSize);
  });
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

  moveSnake(snake, defaultRectSize);
  drawnSnake(snake, defaultRectSize);

  loopId = setTimeout(() => { runGameLoop() }, defaultGameVelocity);
}

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