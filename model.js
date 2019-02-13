class Paddle {
  constructor(width, height, top, left, horizontalBoundary) {
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.horizontalBoundary = horizontalBoundary;
  }
  moveLeft() {
    this.left -= Math.min(20, this.left);
  }
  moveRight() {
    this.left += Math.min(20, this.horizontalBoundary - this.width - this.left);
  }
  isCollide(width, height, top, left) {
    return (
      this.top == top + height &&
      this.left - left <= width &&
      left - (this.left + this.width) < 0
    );
  }
}

class Ball {
  constructor(radius, top, left, horizontalBoundary, verticalBoundary) {
    this.radius = radius;
    this.top = top;
    this.left = left;
    this.x = 2;
    this.y = 2;
    this.horizontalBoundary = horizontalBoundary;
    this.verticalBoundary = verticalBoundary;
  }
  moveHorizontal() {
    this.left += this.x;
  }
  moveVertical() {
    this.top += this.y;
  }
  changeHorizontalDirection() {
    this.x *= -1;
  }
  changeVerticalDirection() {
    this.y *= -1;
  }
  isHorizontalCollide() {
    return this.left == 0 || this.left == this.horizontalBoundary - this.radius;
  }
  isTopCollide() {
    return this.top == 0;
  }
  isBottomCollide() {
    return this.top == this.verticalBoundary - this.radius;
  }
}

class Brick {
  constructor(width, height, top, left) {
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
  }
  invisible() {
    this.height = 0;
    this.width = 0;
  }
  isCollide(width, height, top, left) {
    return (
      this.top == top - height &&
      this.left - left < width &&
      left - (this.left + this.width) < 0
    );
  }
}

class Bricks {
  constructor(screenWidth, height, boundary) {
    console.log(boundary);
    this.width = Math.floor(boundary / 10);
    this.height = height;
    this.boundary = boundary;
    this.bricks = {};
    this.ids = [];
  }
  createBricks() {
    let startTop = 0;
    let startLeft = 0;
    for (let i = 0; i < 60; i++) {
      let brick = new Brick(this.width, this.height, startTop, startLeft);
      this.bricks[i] = brick;
      startLeft += this.width;
      if (startLeft >= Math.floor(this.boundary / 10) * 10) {
        startTop += this.height;
        startLeft = 0;
      }
    }
  }
  remove(id) {
    let remaining = {};
    Object.keys(this.bricks).forEach(x => {
      if (x != id) remaining[x] = this.bricks[x];
    });
    this.bricks = remaining;
  }

  getCollideBrickId(width, height, top, left) {
    let collideIds = Object.keys(this.bricks).filter(x =>
      this.bricks[x].isCollide(width, height, top, left)
    );
    collideIds.forEach(x => this.remove(x));
    return collideIds;
  }
}
class Game {
  constructor(ball, paddle, bricks) {
    this.ball = ball;
    this.paddle = paddle;
    this.bricks = bricks;
    this.collideIds = [];
  }
  isCollidePaddleAndBall() {
    let ball = this.ball;
    return this.paddle.isCollide(ball.radius, ball.radius, ball.top, ball.left);
  }
  isCollideBrickAndBall() {
    let ball = this.ball;
    this.collideIds = this.bricks.getCollideBrickId(
      ball.radius,
      ball.radius,
      ball.top,
      ball.left
    );
    return this.collideIds.length != 0;
  }
}
