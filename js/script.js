// Canvas initialization
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// Configurations
const defaultCanvasSize = 600;
const defaultRectSize = 30;
const defaultGameVelocity = 300;
const snake = [
  { x: 200, y: 200 },
  { x: 230, y: 200 },
];
let direction;

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
  ctx.clearRect(0, 0, defaultCanvasSize, defaultCanvasSize);

  moveSnake(snake, defaultRectSize);
  drawnSnake(snake, defaultRectSize);

  setTimeout(() => { runGameLoop() }, defaultGameVelocity);
}

runGameLoop();