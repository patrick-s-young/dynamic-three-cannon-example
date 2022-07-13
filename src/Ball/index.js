// Three js
import * as THREE from 'three';
// Cannon es
import * as CANNON from 'cannon-es';
import { Vec3 as v3 } from 'cannon-es';
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
    const shape = new CANNON.Sphere(this.radius);
    const body = new CANNON.Body({ 
      mass: 1, 
      shape,
      position: new v3(...position),
      material: ballMaterial
     });
    this.world.addBody(body);
  // mesh
    const geometry = new THREE.SphereGeometry(.25);
    const material = new THREE.MeshBasicMaterial({ color: `#${Math.floor(Math.random()*16777215).toString(16)}` });
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(...position);
    this.scene.add(mesh);
    return { body, mesh }
}