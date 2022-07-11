// Import three
//import { kebabCase } from 'lodash';
import * as THREE from 'three';
// Import the default VRButton
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

// Make a new scene
let scene = new THREE.Scene();
// Set background color of the scene to gray
scene.background = new THREE.Color(0x505050);

// Make a camera. note that far is set to 100, which is better for realworld sized environments
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.6, 3);
scene.add(camera);

// Add some lights
var light = new THREE.DirectionalLight(0xffffff,0.5);
light.position.set(1, 1, 1).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff,0.5))

// Make the shapes
let tetra = createTetrahedron(2, 'mediumspringgreen', new THREE.Vector3(0, 5.6, -10));
scene.add(tetra);

let cube = createCube(2, 'lightsalmon', new THREE.Vector3(-4, 1.6, -10));
scene.add(cube);

let octa = createOctahedron(2, 'lemonchiffon', new THREE.Vector3(0, 1.6, -10));
scene.add(octa);

let dodeca = createDodecahedron(2, 'skyblue', new THREE.Vector3(4, 1.6, -10));
scene.add(dodeca);

let icosa = createIcosahedron(2, 'pink', new THREE.Vector3(0, -2.4, -10));
scene.add(icosa);

// Make a renderer that fills the screen
let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// Turn on VR support
renderer.xr.enabled = true;
// Set animation loop
renderer.setAnimationLoop(render);
// Add canvas to the page
document.body.appendChild(renderer.domElement);

// Add a button to enter/exit vr to the page
document.body.appendChild(VRButton.createButton(renderer));

// For AR instead, import ARButton at the top
//    import { ARButton } from 'https://unpkg.com/three/examples/jsm/webxr/ARButton.js';
// then create the button
//  document.body.appendChild(ARButton.createButton(renderer));

// Handle browser resize
window.addEventListener('resize', onWindowResize, false);

function createCube(size, color, position) {
  let cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(size, size, size),
    new THREE.MeshLambertMaterial({ color: color })
  );
  cube.position.set(position.x, position.y, position.z);
  return cube;
}

function createTetrahedron(size, color, position) {
  let tetra = new THREE.Mesh(
    new THREE.TetrahedronBufferGeometry(size * 0.7),
    new THREE.MeshLambertMaterial({ color: color })
  );
  tetra.position.set(position.x, position.y, position.z);
  return tetra;
}

function createOctahedron(size, color, position) {
  let octa = new THREE.Mesh(
    new THREE.OctahedronBufferGeometry(size * 0.7),
    new THREE.MeshLambertMaterial({ color: color })
  );
  octa.position.set(position.x, position.y, position.z);
  return octa;
}

function createDodecahedron(size, color, position) {
  let dodeca = new THREE.Mesh(
    new THREE.DodecahedronBufferGeometry(size * 0.7),
    new THREE.MeshLambertMaterial({ color: color })
  );
  dodeca.position.set(position.x, position.y, position.z);
  return dodeca;
}

function createIcosahedron(size, color, position) {
  let icosa = new THREE.Mesh(
    new THREE.IcosahedronBufferGeometry(size * 0.7),
    new THREE.MeshLambertMaterial({ color: color })
  );
  icosa.position.set(position.x, position.y, position.z);
  return icosa;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
} 

function render(time) {
    // Rotate the cube
    cube.rotation.y = time / 1000;
    // Rotate the tetra
    tetra.rotation.y = time / 1000;
    // Rotate the octa
    octa.rotation.y = time / 1000;
    // Rotate the dodeca
    dodeca.rotation.y = time / 1000;
    // Rotate the icosa
    icosa.rotation.y = time / 1000;
    // Draw everything
    renderer.render(scene, camera);
}