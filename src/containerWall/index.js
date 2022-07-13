// Three js
import { BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
// Cannon es
import { Box, Body, Vec3 } from 'cannon-es';
// Material
import { containerMaterial } from '../initContactMaterials';

export const containerWall = ({ size, position, color }) => { 
  const halfExtents = new Vec3(size[0] * .5, size[1] * .5, size[2] * .5);
  // phsyics
    const shape = new Box(halfExtents);
    const body = new Body({ 
      position: new Vec3(...position),
      shape,
      material: containerMaterial 
    });

  // mesh
    const geometry = new BoxGeometry(...size);
    const material = new MeshBasicMaterial({ color, transparent: true, opacity: 0.7 });
    const mesh = new Mesh( geometry, material );
    mesh.position.set(...position);
    return { body, mesh };
}