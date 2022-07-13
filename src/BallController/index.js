// Three js
import { Vector3 } from 'three';
// Ball factory
import { Ball } from '../Ball';

export function BallController ({ world, scene }) {
  this.spawnNew = this.spawnNew.bind(this);
  this.deleteOutsideBoundry = this.deleteOutsideBoundry.bind(this);
  this.balls = [];
  this.origin = new Vector3(0, 0, 0);
  this.boundryRadius = 4;
  this.world = world;
  this.scene = scene;
  this.Ball = new Ball({ 
    world, 
    scene, 
    radius: .25, 
    dropFromHeight: this.boundryRadius - .01,
  })

  setInterval(()=> { this.spawnNew() }, 1000);
  setInterval(()=> { this.deleteOutsideBoundry() }, 250);

}

BallController.prototype.spawnNew = function () {
  this.balls.push(this.Ball.spawn());
}

BallController.prototype.deleteOutsideBoundry = function () {
  this.balls.forEach(({body, mesh}, idx) => {
    if (mesh.position.distanceTo(this.origin) > this.boundryRadius) {
      this.world.removeBody(body);
      this.scene.remove(mesh);
      this.balls.splice(idx, 1);
    }
  })
}

BallController.prototype.update = function () {
  this.balls.forEach(item => {
    const { x, y, z} = item.body.position;
    item.mesh.position.set(x, y, z);
  });
}