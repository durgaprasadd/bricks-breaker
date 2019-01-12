let paddle = new Paddle(180, 30, 740, 0, 960);
let ball = new Ball(80, 0, 440, 960, 780);
let game = new Game(ball, paddle);

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

const handlingKeyEvent = function(paddle) {
  if (event.key == 'ArrowRight' && !paddle.isRightBoundary())
    paddle.moveRight();
  if (event.key == 'ArrowLeft' && !paddle.isLeftBoundary()) paddle.moveLeft();
  drawPaddle(paddle);
};

const handlingBallMovement = function(ball, game) {
  if (ball.isVerticalCollide()) {
    ball.changeVerticalDirection();
  }
  if (ball.isHorizontalCollide()) {
    ball.changeHorizontalDirection();
  }
  if (game.isCollide()) {
    ball.changeVerticalDirection();
  }
  if (ball.isBottomCollide()) {
    alert('game over');
    location.reload();
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
  moveBall(ball, game);
};
