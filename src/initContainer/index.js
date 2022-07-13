// Create Mesh + Body
import { containerWall } from '../containerWall';

export const initContainer = ({ world, scene }) => {
  const container = [
    { size: [12, .25, 12], position: [0, 0, 0], color: 0xbb00bb }, // bottom
    { size: [12, 2, .25], position: [0, 1, -6], color: 0x00aa00 }, // back wall
    { size: [.25, 2, 12], position: [6, 1, 0], color: 0x0000aa }, // right wall
   { size: [12, 2, .25], position: [0, 1, 6], color: 0xaa0000 }, // front wall,
   { size: [.25, 2, 12], position: [-6, 1, 0], color: 0x00aaaa }, // left wall
  ];
  container.forEach(props => {
    const element = containerWall(props);
    world.addBody(element.body);
    scene.add(element.mesh);
  });
}
