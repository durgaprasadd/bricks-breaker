let paddle = new Paddle(180, 30, 740, 600, 964);
let ball = new Ball(30, 300, 440, 964, 780);
let bricks = new Bricks(100, 30, 964);
let game = new Game(ball, paddle, bricks);

const createPaddle = function(paddle) {
  let screen = document.getElementById('screen');
  let paddleDiv = document.createElement('div');
  paddleDiv.id = 'paddle_1';
  paddleDiv.className = 'paddle';
  screen.onkeydown = handlingKeyEvent.bind(null, paddle);
  screen.focus();
  screen.appendChild(paddleDiv);
};

const createBall = function() {
  let screen = document.getElementById('screen');
  let ballDiv = document.createElement('div');
  ballDiv.id = 'ball_1';
  ballDiv.className = 'ball';
  screen.appendChild(ballDiv);
};

const createBrick = function() {
  let screen = document.getElementById('screen');
  let brickDiv = document.createElement('div');
  brickDiv.id = 'brick_1';
  brickDiv.className = 'brick';
  screen.appendChild(brickDiv);
};

const addPixelSuffix = function(value) {
  return value + 'px';
};

const drawPaddle = function(paddle) {
  let paddleDiv = document.getElementById('paddle_1');
  paddleDiv.style.width = addPixelSuffix(paddle.width);
  paddleDiv.style.height = addPixelSuffix(paddle.height);
  paddleDiv.style.top = addPixelSuffix(paddle.top);
  paddleDiv.style.left = addPixelSuffix(paddle.left);
};

const drawBall = function(ball) {
  let ballDiv = document.getElementById('ball_1');
  ballDiv.style.width = addPixelSuffix(ball.radius);
  ballDiv.style.height = addPixelSuffix(ball.radius);
  ballDiv.style.top = addPixelSuffix(ball.top);
  ballDiv.style.left = addPixelSuffix(ball.left);
};

const drawBrick = function(brick, id) {
  let brickDiv = document.getElementById('brick_1');
  let childBrickDiv = document.createElement('div');
  childBrickDiv.id = id;
  childBrickDiv.className = 'brick';
  childBrickDiv.style.width = addPixelSuffix(brick.width);
  childBrickDiv.style.height = addPixelSuffix(brick.height);
  childBrickDiv.style.top = addPixelSuffix(brick.top);
  childBrickDiv.style.left = addPixelSuffix(brick.left);
  brickDiv.appendChild(childBrickDiv);
};

const removeId = function(id) {
  let element = document.getElementById(id);
  element.remove();
};

const handlingKeyEvent = function(paddle) {
  if (event.key == 'ArrowRight') paddle.moveRight();
  if (event.key == 'ArrowLeft') paddle.moveLeft();
  drawPaddle(paddle);
};

const handlingBallMovement = function(ball, game) {
  if (ball.isTopCollide()) {
    ball.changeVerticalDirection();
  }
  if (ball.isHorizontalCollide()) {
    ball.changeHorizontalDirection();
  }
  if (game.isCollidePaddleAndBall()) {
    ball.changeVerticalDirection();
  }
  if (ball.isBottomCollide()) {
    alert('game over');
    location.reload();
  }
  if (game.isCollideBrickAndBall()) {
    game.collideIds.forEach(x => removeId(x));
    ball.changeVerticalDirection();
  }

  ball.moveHorizontal();
  ball.moveVertical();
  drawBall(ball);
};

const moveBall = function(ball, game) {
  setInterval(handlingBallMovement.bind(null, ball, game), 10);
};

window.onload = function() {
  createPaddle(paddle);
  drawPaddle(paddle);
  createBall();
  drawBall(ball);
  createBrick();
  console.log(bricks);
  bricks.createBricks();
  Object.keys(bricks.bricks).forEach(x => drawBrick(bricks.bricks[x], x));
  moveBall(ball, game);
};
