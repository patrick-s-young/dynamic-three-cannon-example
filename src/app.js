// Three js
import { Scene, PerspectiveCamera, WebGLRenderer,  HemisphereLight, DirectionalLight, Clock } from 'three';
// Cannon es
import { World, NaiveBroadphase } from 'cannon-es';
// Dev/Debug
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import CannonDebugger from 'cannon-es-debugger';
// Object creation
import { initContainer } from './initContainer';
import { initContactMaterials } from './initContactMaterials';
import { BallController } from './BallController';
// Styles
import './main.css';

// INIT CANNON ES
const world = new World();
world.gravity.set(0, -30, 0);
world.broadphase = new NaiveBroadphase();

// INIT THREE JS
const scene = new Scene()
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 5.5, 7.75);
const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild(renderer.domElement);

// INIT MESH/BODY 
initContactMaterials({ world });
initContainer({ world, scene });
const ballController = new BallController({ world, scene });

// LIGHTS
scene.add( new HemisphereLight( 0x606060, 0x404040 ) );
const light = new DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 ).normalize();

// DEV/DEBUG HELPERS
const cannonDebugger = new CannonDebugger(scene, world);
const controls = new OrbitControls(camera, renderer.domElement);

// INIT ANIMATION VALUES
const clock = new Clock();
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


// WINDOW RESIZE
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}