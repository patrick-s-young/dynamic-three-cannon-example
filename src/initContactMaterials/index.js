// CANNON
import { Material, ContactMaterial } from 'cannon-es';

export const ballMaterial = new Material('ball');
export const containerMaterial = new Material('container');
export const initContactMaterials = ({ world }) => {
// BALL & CONTAINER
  const ballAndPlayfield = new ContactMaterial(
    containerMaterial, 
    ballMaterial, {
    friction: 0.1,
    restitution: 0.8
    }
  );
  world.addContactMaterial(ballAndPlayfield);
}