import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

camera.position.z += 5;
scene.background = new THREE.Color(0x0a0a0a);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controlGeo = new THREE.BoxGeometry(1, 1, 1);
let controlMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
let controlMesh = new THREE.Mesh(controlGeo, controlMaterial);
scene.add(controlMesh);

let planeGeo = new THREE.PlaneGeometry(100, 100);
let planeMesh = new THREE.Mesh(planeGeo, new THREE.MeshBasicMaterial({ color: 0xffffff }));
planeMesh.rotation.x -= Math.PI / 2;
planeMesh.position.y -= 0.5;
scene.add(planeMesh);

let keyboard = [];

document.body.onkeydown = function (evt) {
  keyboard[evt.key] = true;
};

document.body.onkeyup = function (evt) {
  keyboard[evt.key] = false;
};

function process_keyboard() {
  if (keyboard["a"]) {
    planeMesh.position.x += 0.05;
  } else if (keyboard["d"]) {
    planeMesh.position.x -= 0.05;
  }

  if (keyboard["w"]) {
    planeMesh.position.z += 0.05;
  } else if (keyboard["s"]) {
    planeMesh.position.z -= 0.05;
  }

  if (keyboard["e"]) {
    camera.position.x -= 0.05;
  } else if (keyboard["q"]) {
    camera.position.x += 0.05;
  }
}

let clock = new THREE.Clock();
// let controls = new OrbitControls(camera, renderer.domElement);
let controls = new FirstPersonControls(camera, renderer.domElement);
controls.lookSpeed = 0.5;

function animate() {
  process_keyboard();
  controls.update(clock.getDelta());
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
