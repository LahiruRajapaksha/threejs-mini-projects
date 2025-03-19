import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Line2,
  LineGeometry,
  LineMaterial,
} from "three/examples/jsm/Addons.js";

const renderer = new THREE.WebGLRenderer();
const width = window.innerWidth;
const height = window.innerHeight;

// Set the size of the renderer
renderer.setSize(width, height);

// Append the renderer to the body
document.body.append(renderer.domElement);

// Initializing the scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Controls the camera
const orbit = new OrbitControls(camera, renderer.domElement);
// Setting up the camera postion
camera.position.set(0, 50, 50);
orbit.update();

// Initializing an ambient light
const ambientLight = new THREE.AmbientLight(0x333333, 10);
scene.add(ambientLight);

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const material = new LineMaterial({
  color: 0x0000ff,
  linewidth: 3,
});

const points1: THREE.Vector3[] = [];
points1.push(new THREE.Vector3(-2, 8, 0));
points1.push(new THREE.Vector3(0, 10, 0));
points1.push(new THREE.Vector3(2, 8, 0));

const points2: THREE.Vector3[] = [];
points2.push(new THREE.Vector3(0, 0, 0));
points2.push(new THREE.Vector3(0, 10, 0));

const geometry1 = new LineGeometry();

geometry1.setPositions(points1.flatMap((p) => [p.x, p.y, p.z]));
// const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line1 = new Line2(geometry1, material);
const geometry2 = new LineGeometry();

geometry2.setPositions(points2.flatMap((p) => [p.x, p.y, p.z]));
const line2 = new Line2(geometry2, material);

const group1 = new THREE.Group();
group1.add(line1);
group1.add(line2);
group1.position.x = 5;

scene.add(group1);

const geometry = new THREE.ConeGeometry(1, 2, 3);
const materialCone = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const cone = new THREE.Mesh(geometry, materialCone);
cone.position.y = 10;

const line3 = line2.clone();
const group2 = new THREE.Group();

group2.add(cone);
group2.add(line3);

scene.add(group2);

const sphereGeometry = new THREE.SphereGeometry(1);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 10;

const line4 = line2.clone();

const group3 = new THREE.Group();
group3.add(line4);
group3.add(sphere);

group3.position.x = -5;

scene.add(group3);

const animate = () => {
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
