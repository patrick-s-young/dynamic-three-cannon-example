// Three js
import * as THREE from 'three';
// Cannon es
import * as CANNON from 'cannon-es';
import { Vec3 as v3 } from 'cannon-es';
// Material
import { containerMaterial } from '../initContactMaterials';

export const containerWall = ({ size, position, color }) => { 
  const halfExtents = new v3(size[0] * .5, size[1] * .5, size[2] * .5);
  // phsyics
    const shape = new CANNON.Box(halfExtents);
    const body = new CANNON.Body({ 
      position: new v3(...position),
      shape,
      material: containerMaterial 
    });

  // mesh
    const geometry = new THREE.BoxGeometry(...size);
    const material = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.7 });
    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(...position);
    return { body, mesh };
}