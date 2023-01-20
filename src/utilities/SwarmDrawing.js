import Victor from "victor";
import { Swarm } from "./Swarm";

export class SwarmDrawing {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = canvas.getContext("2d");
    this.swarm = new Swarm(100, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = "forestgreen";
    this.animationIsRunning = false;
    this.goal = new Victor();

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
      this.ctx.arc(boid.position.x, boid.position.y, 5, 0, 2 * Math.PI);
      this.ctx.moveTo(boid.position.x + 4, boid.position.y + 1);
      this.ctx.arc(boid.position.x + 4, boid.position.y - 1, 3, 0, 2 * Math.PI);
      this.ctx.moveTo(boid.position.x - 4, boid.position.y + 1);
      this.ctx.arc(boid.position.x - 4, boid.position.y - 1, 3, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }
}
