class Paddle {
  constructor(width, height, top, left, horizontalBoundary) {
    this.width = width;
    this.height = height;
    this.top = top;
    this.left = left;
    this.horizontalBoundary = horizontalBoundary;
  }
  moveLeft() {
    this.left -= 10;
  }
  moveRight() {
    this.left += 10;
  }
  isLeftBoundary() {
    return this.left == 0;
  }
  isRightBoundary() {
    return this.left == this.horizontalBoundary - this.width;
  }
}

class Ball {
  constructor(radius, top, left, horizontalBoundary, verticalBoundary) {
    this.radius = radius;
    this.top = top;
    this.left = left;
    this.x = -1;
    this.y = -1;
    this.horizontalBoundary = horizontalBoundary;
    this.verticalBoundary = verticalBoundary;
  }
  moveHorizontal() {
    this.left += this.x * 5;
  }
  moveVertical() {
    this.top += this.y * 5;
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
  isVerticalCollide() {
    return this.top == 0;
  }
  isBottomCollide() {
    return this.top == this.verticalBoundary - this.radius;
  }
}

class bricks {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  invisible() {
    this.height = 0;
    this.width = 0;
  }
}

class Game {
  constructor(ball, paddle) {
    this.ball = ball;
    this.paddle = paddle;
  }
  isCollide() {
    return (
      ball.top + ball.radius == paddle.top &&
      paddle.left - ball.left < ball.radius &&
      ball.left - (paddle.left + paddle.width) < 0
    );
  }
}
