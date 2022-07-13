// Three js
import * as THREE from 'three';
// Cannon es
import * as CANNON from 'cannon-es';
// Dev/Debug
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import CannonDebugger from 'cannon-es-debugger';
// Object creation
import { initContainer } from './initContainer';
import { initContactMaterials } from './initContactMaterials';
import { BallController } from './BallController';

// INIT CANNON ES
const world = new CANNON.World();
world.gravity.set(0, -30, 0);
world.broadphase = new CANNON.NaiveBroadphase();

// INIT THREE JS
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 4.5, 6.75);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild(renderer.domElement);

// INIT MESH/BODY 
initContactMaterials({ world });
initContainer({ world, scene });
const ballController = new BallController({ world, scene });

// LIGHTS
scene.add( new THREE.HemisphereLight( 0x606060, 0x404040 ) );
const light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 ).normalize();

// DEV/DEBUG HELPERS
const cannonDebugger = new CannonDebugger(scene, world);
const controls = new OrbitControls(camera, renderer.domElement);

// INIT ANIMATION VALUES
const clock = new THREE.Clock();
let delta;
const timeStep = 1/60;
const maxSubSteps = 10;
// ANIMATION LOOP
function animate() {
  controls.update();
  //cannonDebugger.update();
  delta = Math.min(clock.getDelta(), 0.1)
  world.step(timeStep, delta, maxSubSteps);   
  ballController.update();
  renderer.render(scene, camera)
  requestAnimationFrame(animate);
}
// START ANIMATION
animate();
