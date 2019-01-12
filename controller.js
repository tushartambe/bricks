const getScreen = document => document.getElementById("screen");

const addPixelSuffix = input => input + "px";

const movePaddle = function(document, paddle) {
  if (event.key == "ArrowRight") {
    paddle.moveRight();
  }
  if (event.key == "ArrowLeft") {
    paddle.moveLeft();
  }
  drawPaddle(document, paddle);
};

const drawPaddle = function(document, paddle) {
  let paddleDiv = document.getElementById("paddle_1");

  paddleDiv.style.width = addPixelSuffix(paddle.width);
  paddleDiv.style.height = addPixelSuffix(paddle.height);
  paddleDiv.style.bottom = addPixelSuffix(paddle.bottom);
  paddleDiv.style.left = addPixelSuffix(paddle.left);
  let screen = getScreen(document);
  screen.tabIndex = "0";
  screen.focus();
  screen.onkeydown = movePaddle.bind(null, document, paddle);
};

const initializePaddle = function(document) {
  let screen = getScreen(document);
  let paddleDiv = document.createElement("div");
  paddleDiv.className = "paddle";
  paddleDiv.id = "paddle_1";
  screen.appendChild(paddleDiv);
};

const initilize = document => {
  let paddle = new Paddle(100, 20, 430, 5);
  initializePaddle(document);
  drawPaddle(document, paddle);
};

window.onload = initilize.bind(null, document);
