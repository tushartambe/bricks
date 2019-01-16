const isInBetween = function(upper, lower, number) {
  return number > lower && number < upper;
};

class Paddle {
  constructor(width, height, left, bottom, speed) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.bottom = bottom;
    this.speed = speed;
  }
  moveLeft() {
    this.left -= this.speed;
  }
  moveRight() {
    this.left += this.speed;
  }

  isBallCollide(ball) {
    let isBallOnPaddle = isInBetween(
      this.left + this.width,
      this.left,
      ball.left
    );
    if (ball.bottom == this.bottom + this.height && isBallOnPaddle) {
      ball.dy = -1 * ball.dy;
      ball.dx = ball.dx;
    }
  }

  isPaddleAtBorder(screenWidth) {
    if (this.left + this.width + this.speed >= screenWidth) {
      this.left = screenWidth - (this.width + this.speed);
    }
    if (this.left <= 0) {
      this.left = 0;
    }
  }
}

class Ball {
  constructor(radius, left, bottom, dx, dy) {
    this.radius = radius;
    this.left = left;
    this.bottom = bottom;
    this.dx = dx;
    this.dy = dy;
  }
  move() {
    this.left = this.left + this.dx;
    this.bottom = this.bottom + this.dy;
  }
}

class Walls {
  constructor(width) {
    this.width = width;
  }
  isBallCollide(ball) {
    if (!(ball.left + ball.radius + ball.dx <= this.width && ball.left >= 0)) {
      ball.dx = -1 * ball.dx;
      ball.dy = ball.dy;
    }
  }
}

class RoofAndGround {
  constructor(height) {
    this.height = height;
  }

  isBallCollide(ball) {
    if (ball.bottom + ball.radius + ball.dy >= this.height) {
      ball.dy = -1 * ball.dy;
      ball.dx = ball.dx;
    }
    if (ball.bottom <= 0) {
      ball.dy = 0;
      ball.dx = 0;
    }
  }
}

class Brick {
  constructor(width, height, left, bottom, id) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.bottom = bottom;
    this.id = id;
  }
}

class Bricks {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  createBricks() {
    let bricks = [];
    let brickWidth = 103;
    let left = 15;
    let bottom = this.height - 30;
    for (let rows = 1; rows < 8; rows++) {
      for (let column = 1; column < 9; column++) {
        let brickId = `brick_${column}_${rows}`;
        let brick = new Brick(brickWidth, 30, left, bottom, brickId);
        bricks.push(brick);
        left = left + brickWidth + 15;
      }
      left = 15;
      bottom = bottom - 40;
    }
    return bricks;
  }
}

const checkCollisionWithBrick = function(ball, brick) {
  return (
    isInBetween(brick.left + brick.width, brick.left, ball.left) &&
    isInBetween(brick.bottom, brick.bottom - ball.radius, ball.bottom)
  );
};

class Game {
  constructor(ball, paddle, walls, roofAndGround, bricks) {
    this.ball = ball;
    this.paddle = paddle;
    this.walls = walls;
    this.roofAndGround = roofAndGround;
    this.bricks = bricks;
  }

  checkCollisionBrick() {
    const hasTouchedBrick = checkCollisionWithBrick.bind(null, this.ball);
    return this.bricks.filter(hasTouchedBrick);
  }
}
