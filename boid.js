const Victor = require("victor");

class Boid {
  constructor(posX, posY) {
    this.position = new Victor(posX, posY);
    this.velocity = new Victor(0, 0);
    this.acceleration = new Victor(0, 0);
  }

  update() {
    this.posX += 1;
    this.posY += 1;
  }

  alignment() {}

  separation() {}

  cohesion() {}
}
