import * as CANNON from 'cannon-es';
export const ballMaterial = new CANNON.Material('ball');
export const containerMaterial = new CANNON.Material('container');


export const initContactMaterials = ({ world }) => {
// BALL & CONTAINER
  const ballAndPlayfield = new CANNON.ContactMaterial(
    containerMaterial, 
    ballMaterial, {
    friction: 0.1,
    restitution: 0.8
    }
  );
  world.addContactMaterial(ballAndPlayfield);
}