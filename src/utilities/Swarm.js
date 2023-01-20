import { Boid } from "./Boid";

export class Swarm {
  constructor(numBoids, maxPosX, maxPosY) {
    this.numBoids = numBoids;
    this.maxPosX = maxPosX;
    this.maxPosY = maxPosY;

    this.boids = [];

    for (let i = 0; i < numBoids; i++) {
      const randX = Math.floor(Math.random() * maxPosX);
      const randY = Math.floor(Math.random() * maxPosY);
      this.boids.push(new Boid(randX, randY));
    }
  }

  update(goal) {
    for (const boid of this.boids) {
      boid.update(this.boids, goal);
    }
  }
}
