// Three js
import { SphereGeometry, MeshBasicMaterial, Mesh } from 'three';
// Cannon es
import { Body, Sphere, Vec3 } from 'cannon-es';
// Material
import { ballMaterial } from '../initContactMaterials';

export function Ball ({ world, scene, radius, dropFromHeight }) {
  this.world = world;
  this.scene = scene;
  this.radius = radius;
  this.dropFromHeight = dropFromHeight;
  this.spawn = this.spawn.bind(this);
}

Ball.prototype.spawn = function () {
  const position = [ -.01 + Math.random() * .02, this.dropFromHeight, -.01 + Math.random() * .02 ]; 
    // phsyics
    const shape = new Sphere(this.radius);
    const body = new Body({ 
      mass: 1, 
      shape,
      position: new Vec3(...position),
      material: ballMaterial
     });
    this.world.addBody(body);
  // mesh
    const geometry = new SphereGeometry(.25);
    const material = new MeshBasicMaterial({ color: `#${Math.floor(Math.random()*16777215).toString(16)}` });
    const mesh = new Mesh( geometry, material );
    mesh.position.set(...position);
    this.scene.add(mesh);
    return { body, mesh }
}