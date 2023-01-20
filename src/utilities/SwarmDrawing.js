import Victor from "victor";
import { Swarm } from "./Swarm";

export class SwarmDrawing {
  constructor(canvas) {
    // Drawing parameters
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = "forestgreen";
    this.boidRadius = 2;

    this.swarm = new Swarm(300, this.canvas.width, this.canvas.height);
    this.goal = new Victor();
    this.animationIsRunning = false;

    // Set up the update/render loop
    setInterval(() => {
      if (this.animationIsRunning) {
        this.swarm.update(this.goal);
        this.render(this.swarm);
      }
    }, 33);
  }

  beginAnimation() {
    this.animationIsRunning = true;
  }

  stopAnimation() {
    this.animationIsRunning = false;
  }

  updateGoal(coordinates) {
    this.goal.x = coordinates.x;
    this.goal.y = coordinates.y;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let boid of this.swarm.boids) {
      this.ctx.beginPath();
      this.ctx.arc(
        boid.position.x,
        boid.position.y,
        this.boidRadius,
        0,
        2 * Math.PI
      );
      this.ctx.moveTo(boid.position.x + this.boidRadius, boid.position.y + 1);
      this.ctx.arc(
        boid.position.x + this.boidRadius,
        boid.position.y - 1,
        this.boidRadius / 2,
        0,
        2 * Math.PI
      );
      this.ctx.moveTo(boid.position.x - this.boidRadius, boid.position.y + 1);
      this.ctx.arc(
        boid.position.x - this.boidRadius,
        boid.position.y - 1,
        this.boidRadius / 2,
        0,
        2 * Math.PI
      );
      this.ctx.fill();
    }
  }
}
