import Victor from "victor";

export class Boid {
  constructor(posX, posY) {
    this.position = new Victor(posX, posY);
    this.velocity = new Victor(0, 0);
    this.acceleration = new Victor(0, 0);

    // Arbitrary, tunable values
    this.separationDistance = 10;
    this.separationAccelWeight = 0.1;
    this.alignmentAccelWeight = 0.1;
    this.cohesionWeight = 0.1;

    this.maxAccel = 3;
    this.maxVelocity = 4;
  }

  update(otherBoids) {
    const alignmentAcceleration = this.getAlignmentAccel(
      otherBoids
    ).multiplyScalar(this.alignmentAccelWeight);

    const cohesionAcceleration = this.getCohesionAccel(
      otherBoids
    ).multiplyScalar(this.cohesionWeight);

    const separationAcceleration = this.getSeparationAccel(
      otherBoids
    ).multiplyScalar(this.separationAccelWeight);

    this.acceleration
      .add(separationAcceleration)
      .add(alignmentAcceleration)
      .add(cohesionAcceleration);

    if (this.acceleration.magnitude() > this.maxAccel) {
      this.acceleration.normalize().multiplyScalar(this.maxAccel);
    }

    this.velocity.add(this.acceleration);
    if (this.velocity.magnitude() > this.maxVelocity) {
      this.velocity.normalize().multiplyScalar(this.maxVelocity);
    }

    this.position.add(this.velocity);
    this.acceleration.multiplyScalar(0);
  }

  getAlignmentAccel(otherBoids) {
    const accelerationToAlign = new Victor();
    for (let otherBoid of otherBoids) {
      accelerationToAlign.add(otherBoid.velocity);
    }
    accelerationToAlign.divideScalar(otherBoids.length);
    return accelerationToAlign;
  }

  getSeparationAccel(otherBoids) {
    const accelerationToSeparate = new Victor();

    for (let otherBoid of otherBoids) {
      const distance = this.position.distance(otherBoid.position);
      const isSelf = distance === 0;
      const isTooClose = distance < this.separationDistance;

      if (!isSelf && isTooClose) {
        // Closer to a neighbor means a stronger repulsion
        const repulsion = this.separationDistance - distance;
        const awayVector = this.position
          .clone()
          .subtract(otherBoid.position)
          .normalize()
          .multiplyScalar(repulsion);
        accelerationToSeparate.add(awayVector);
      }
    }
    return accelerationToSeparate;
  }

  getCohesionAccel(otherBoids) {
    for (let other of otherBoids) {
    }
    return new Victor(0, 0);
  }
}
