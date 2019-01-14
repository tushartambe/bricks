const getScreen = document => document.getElementById("screen");

const addPixelSuffix = input => input + "px";

const movePaddle = function(document, paddle) {
  if (event.key == "ArrowRight") {
    paddle.moveRight();
  }
  if (event.key == "ArrowLeft" && paddle.left > 0) {
    paddle.moveLeft();
  }
  drawPaddle(document, paddle);
};

const moveBall = function(document, game) {
  setInterval(() => {
    game.walls.isBallCollide(game.ball);
    game.roofAndGround.isBallCollide(game.ball);
    game.ball.move();
    game.paddle.isBallCollide(game.ball);
    game.paddle.isPaddleAtBorder(game.walls.width);
    drawBall(document, game.ball);
    game.checkCollisionBrick();
    destroyBrick(document, game);
  }, 50);
};

const drawPaddle = function(document, paddle, ball) {
  let paddleDiv = document.getElementById("paddle_1");

  paddleDiv.style.width = addPixelSuffix(paddle.width);
  paddleDiv.style.height = addPixelSuffix(paddle.height);
  paddleDiv.style.bottom = addPixelSuffix(paddle.bottom);
  paddleDiv.style.left = addPixelSuffix(paddle.left);
};

const drawBall = function(document, ball) {
  let ballDiv = document.getElementById("ball_1");

  ballDiv.style.width = addPixelSuffix(ball.radius);
  ballDiv.style.height = addPixelSuffix(ball.radius);
  ballDiv.style.bottom = addPixelSuffix(ball.bottom);
  ballDiv.style.left = addPixelSuffix(ball.left);
};

const drawBricks = function(bricks) {
  let screen = getScreen(document);

  for (let counter = 0; counter < bricks.length; counter++) {
    let brick = document.createElement("div");
    brick.className = "brick";
    brick.id = bricks[counter].id;
    brick.style.width = addPixelSuffix(bricks[counter].width);
    brick.style.height = addPixelSuffix(bricks[counter].height);
    brick.style.left = addPixelSuffix(bricks[counter].left);
    brick.style.bottom = addPixelSuffix(bricks[counter].bottom);
    screen.appendChild(brick);
  }
};

const initializePaddle = function(document, paddle) {
  let screen = getScreen(document);

  let paddleDiv = document.createElement("div");
  paddleDiv.className = "paddle";
  paddleDiv.id = "paddle_1";
  screen.appendChild(paddleDiv);

  screen.tabIndex = "0";
  screen.focus();
  screen.onkeydown = movePaddle.bind(null, document, paddle);
};

const destroyBrick = function(document, game) {
  const bricksToDstroy = game.checkCollisionBrick();
  bricksToDstroy.map(brick => {
    const child = document.getElementById(brick.id);
    child.remove();
    game.ball.dy = -game.ball.dy;
  });
};

const initilizeBall = function(document, ball) {
  let screen = getScreen(document);
  let ballDiv = document.createElement("div");
  ballDiv.className = "ball";
  ballDiv.id = "ball_1";
  screen.appendChild(ballDiv);
};

const initilize = document => {
  let paddle = new Paddle(100, 20, 430, 5, 20);
  let ball = new Ball(30, 465, 25, 10, 10);
  let walls = new Walls(960);
  let roofAndGround = new RoofAndGround(700);
  let bricks = new Bricks(960, 700);
  let game = new Game(
    ball,
    paddle,
    walls,
    roofAndGround,
    bricks.createBricks()
  );
  drawBricks(bricks.createBricks());
  initializePaddle(document, paddle);
  initilizeBall(document, ball);
  drawPaddle(document, paddle);
  drawBall(document, ball);
  moveBall(document, game);
};

window.onload = initilize.bind(null, document);
