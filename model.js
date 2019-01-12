class Paddle {
  constructor(width, height, left, bottom) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.bottom = bottom;
  }
  moveLeft() {
    this.left -= 10;
  }
  moveRight() {
    this.left += 10;
  }
}

class Screen {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
}

class Game {}
