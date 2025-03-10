import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import earthTexture from "./images/earthmap.jpg";
import jupitarTexture from "./images/jupitermap.jpg";
import marsTexture from "./images/marsmap.jpg";
import mercuryTexture from "./images/mercurymap.jpg";
import moonTexture from "./images/moonmap.jpg";
import neptuneTexture from "./images/neptunemap.jpg";
import plutoTexture from "./images/plutomap.jpg";
import saturnTexture from "./images/saturnmap.jpg";
import saturnRingTexture from "./images/saturnring.jpg";
import starsTexture from "./images/stars.jpg";
import sunTexture from "./images/sunmap.jpg";
import uranusTexture from "./images/uranusmap.jpg";
import uranusRingTexture from "./images/uranusring.jpg";
import venusTexture from "./images/venusmap.jpg";

type RingProperties = {
  innerRadius: number;
  outerRadius: number;
  ringTexture: string;
};

const renderer = new THREE.WebGLRenderer();
const width = window.innerWidth;
const height = window.innerHeight;

// Set the size of the renderer
renderer.setSize(width, height);

// Append the renderer to the body
document.body.append(renderer.domElement);

// Initializing the scene
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);

// Controls the camera
const orbit = new OrbitControls(camera, renderer.domElement);

// Setting up the camera postion
camera.position.set(-90, 140, 140);
orbit.update();

// Initializing an ambient light
const ambientLight = new THREE.AmbientLight(0x333333, 10);
scene.add(ambientLight);

// Adding a point light
const pointLight = new THREE.PointLight(0xffffff, 6000, 400);
scene.add(pointLight);

// Initializing a new textureloader
const textureLoader = new THREE.TextureLoader();

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);
/**
 * Add an invisible parent. This is because when we rotate the planets
 * around the Sun, other planets will take the Sun's rotation speed. Becasue others bind to the
 * Sun as its parent. So what we need is an invisible object which will be at the center point and
 * relative to that other planets will be rotate
 */

// Adding the planet Geomatries using a common function
const createPlanets = (
  size: number,
  texture: string,
  position: number,
  ring?: RingProperties
) => {
  const parentObj = new THREE.Object3D();
  const geometry = new THREE.SphereGeometry(size, 30, 30);
  const material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geometry, material);
  parentObj.add(mesh);

  if (ring) {
    const { innerRadius, outerRadius, ringTexture } = ring;
    const ringGeometry = new THREE.RingGeometry(innerRadius, outerRadius, 32);
    const ringMaterial = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ringTexture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    parentObj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = 0.5 * Math.PI;
  }
  scene.add(parentObj);
  mesh.position.x = position;

  return { mesh, parentObj };
};

const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const mercury = createPlanets(3.2, mercuryTexture, 28);
const venus = createPlanets(5.8, venusTexture, 44);
const earth = createPlanets(6, earthTexture, 62);
const mars = createPlanets(4, marsTexture, 78);
const jupitor = createPlanets(12, jupitarTexture, 100);
const saturn = createPlanets(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  ringTexture: saturnRingTexture,
});
const uranus = createPlanets(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  ringTexture: uranusRingTexture,
});
const neptune = createPlanets(7, neptuneTexture, 200);
const pluto = createPlanets(2.8, plutoTexture, 216);

const animate = () => {
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupitor.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);

  mercury.parentObj.rotateY(0.04);
  venus.parentObj.rotateY(0.015);
  earth.parentObj.rotateY(0.01);
  mars.parentObj.rotateY(0.008);
  jupitor.parentObj.rotateY(0.002);
  saturn.parentObj.rotateY(0.0009);
  uranus.parentObj.rotateY(0.0004);
  neptune.parentObj.rotateY(0.0001);
  pluto.parentObj.rotateY(0.00007);

  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});
