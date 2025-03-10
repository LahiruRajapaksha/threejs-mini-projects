import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";
import nebula from "./img/nebula.jpg";
import space from "./img/space.jpg";

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight); // set the size of the renderer

document.body.appendChild(renderer.domElement); // append the renderer to the body

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// fov - field of view between 40 and 80 normally
// aspect ratio - width / height
// near - closest distance to the camera
// far - farthest distance to the camera

const orbit = new OrbitControls(camera, renderer.domElement); // controls the camera

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

orbit.update(); // update the camera position
camera.position.set(-10, 50, 30);
camera.lookAt(new THREE.Vector3(0, 0, 0));

// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

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

// const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
// const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000FF, wireframe: false });
// const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
// scene.add(sphere);
// sphere.position.set(-10, 10, 0);
// sphere.castShadow = true

const ambientLight = new THREE.AmbientLight(0x333333); // adding ambient light instance to the scene params = color, intensity
scene.add(ambientLight);

const tableTop = new THREE.BoxGeometry(0.5, 16, 10);
const tableTopMaterial = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
});
const table = new THREE.Mesh(tableTop, tableTopMaterial);
scene.add(table);
table.castShadow = true;
table.position.set(0, 10, 0);
// table.rotation.x = 2 * Math.PI;
table.rotation.z = 0.5 * Math.PI;

const tableLeg1 = new THREE.CylinderGeometry(0.5, 0.25, 8);
const tableLeg1Material = new THREE.MeshStandardMaterial();
const leg1 = new THREE.Mesh(tableLeg1, tableLeg1Material);
table.add(leg1);
// scene.add(leg1)
leg1.position.set(-4, 7, 4);
leg1.rotation.z = -0.5 * Math.PI;
leg1.castShadow = true;

const tableLeg2 = new THREE.CylinderGeometry(0.5, 0.25, 8);
const tableLeg2Material = new THREE.MeshStandardMaterial();
const leg2 = new THREE.Mesh(tableLeg2, tableLeg2Material);
table.add(leg2);
leg2.rotation.z = -0.5 * Math.PI;
leg2.position.set(-4, 7, -4);
leg2.castShadow = true;

const tableLeg3 = new THREE.CylinderGeometry(0.5, 0.25, 8);
const tableLeg3Material = new THREE.MeshStandardMaterial();
const leg3 = new THREE.Mesh(tableLeg3, tableLeg3Material);
table.add(leg3);
leg3.rotation.z = -0.5 * Math.PI;
leg3.position.set(-4, -7, -4);
leg3.castShadow = true;

const tableLeg4 = new THREE.CylinderGeometry(0.5, 0.25, 8);
const tableLeg4Material = new THREE.MeshStandardMaterial();
const leg4 = new THREE.Mesh(tableLeg4, tableLeg4Material);
table.add(leg4);
leg4.rotation.z = -0.5 * Math.PI;
leg4.position.set(-4, -7, 4);
leg4.castShadow = true;

// Directional Light
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF,2.5);
// scene.add(directionalLight);
// directionalLight.position.set(-30, 50, 0);
// directionalLight.castShadow = true
// directionalLight.shadow.camera.bottom = -12;

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(dLightHelper);

// const dLightShadowHelper = new  THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(dLightShadowHelper)

/**
 * These helpers are used to see how the cameras works, it gives the visuals of lines and other things
 * so we can  uderstand how it is positioned and lights rays or  things  works. it's for our easyness
 */

// Spot light
const spotLight = new THREE.SpotLight(0xffffff);
scene.add(spotLight);
spotLight.position.set(-30, 30, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

scene.fog = new THREE.Fog(0xffffff, 0, 200);
// renderer.setClearColor(0xFFFFFF);

// const textureLoader  = new THREE.TextureLoader(); // adding custom images
// scene.background = textureLoader.load(space);
// const cubeTextureLoader = new THREE.CubeTextureLoader();
// scene.background = cubeTextureLoader.load([
//     nebula,
//     nebula,
//     space,
//     space,
//     space,
//     space
// ], undefined, () => {
//     console.error('An error occured while loading the images')
// });

// const box2Geometry  = new THREE.BoxGeometry(4, 4, 4);
// const box2Material = new THREE.MeshBasicMaterial({
//     color: 0x00FF00,
//     map: textureLoader.load(nebula)
// });
// const box2MultiMaterial = [
//     new THREE.MeshBasicMaterial({map:  textureLoader.load(space)}),
//     new THREE.MeshBasicMaterial({map:  textureLoader.load(space)}),
//     new THREE.MeshBasicMaterial({map:  textureLoader.load(nebula)}),
//     new THREE.MeshBasicMaterial({map:  textureLoader.load(nebula)}),
//     new THREE.MeshBasicMaterial({map:  textureLoader.load(nebula)}),
//     new THREE.MeshBasicMaterial({map:  textureLoader.load(space)}),
// ];
// const box2 = new  THREE.Mesh(box2Geometry, box2MultiMaterial)
// scene.add(box2);
// box2.position.set(3, 5 ,0)

const gui = new dat.GUI();

const options = {
  shpereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
  angle: 0.92,
  penumbra: 0,
  intensity: 1000,
};

// gui.addColor(options, 'shpereColor').onChange((e) => {
//     sphere.material.color.set(e);
// });

// gui.add(options, 'wireframe').onChange((e) => {
//     sphere.material.wireframe = e;
// });

gui.add(options, "speed", 0, 0.1);

gui.add(options, "angle", 0, 1);
gui.add(options, "penumbra", 0, 1);
gui.add(options, "intensity", 100, 2000);

let step = 0;

const mousePosition = new THREE.Vector2(); // putting the x, y values of the cursor position
//normalized values

window.addEventListener("mousemove", (e) => {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1; // x position of the cursor
  mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1; // x position of the cursor
});

const rayCaster = new THREE.Raycaster();

const animate = () => {
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // step  += options.speed;
  // sphere.position.y = 10 * Math.abs(Math.sin(step));

  spotLight.angle = options.angle;
  spotLight.penumbra = options.penumbra;
  spotLight.intensity = options.intensity;
  spotLightHelper.update();

  rayCaster.setFromCamera(mousePosition, camera);
  const intersects = rayCaster.intersectObjects(scene.children); // saves the bojects which intersects the camera ray
  // console.log(intersects)
  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
