import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// three/addons/loaders/GLTFLoader.js
let mesh1, mesh2, glbObj, renderer, scene, camera, controls;

const loader = new GLTFLoader();
const loadGlbs = () => {
  return new Promise((resolve, reject) => {
    loader.load(
      // resource URL
      "https://cdn.jsdelivr.net/gh/mrdoob/three.js@master/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf",
      // called when the resource is loaded
      function (gltf) {
        glbObj = gltf.scene;
        glbObj.position.set(30, 20, 20);
        glbObj.scale.set(5, 5, 5);
        scene.add(glbObj);
        resolve(glbObj);
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened");
        console.log(error);
        reject(error);
      }
    );
  });
};

const init = async () => {
  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setAnimationLoop(animate);
  document.body.appendChild(renderer.domElement);

  // scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  // camera
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(60, 60, 10);

  // controls
  controls = new OrbitControls(camera, renderer.domElement);

  // ambient
  scene.add(new THREE.AmbientLight(0x222222));

  // light
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(20, 20, 0);
  scene.add(light);

  // axes
  scene.add(new THREE.AxesHelper(40));

  // geometry

  const geometry1 = new THREE.SphereGeometry(5, 12, 8);
  const geometry2 = new THREE.SphereGeometry(5, 12, 8);

  // material
  const material1 = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    flatShading: true,
    transparent: true,
    opacity: 1,
    side: THREE.DoubleSide,
  });

  const material2 = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    flatShading: true,
    transparent: true,
    opacity: 1,
  });

  // Load a glTF resource
  await loadGlbs();

  // mesh
  mesh1 = new THREE.Mesh(geometry1, material1);
  mesh2 = new THREE.Mesh(geometry2, material2);

  scene.add(mesh1);
  scene.add(mesh2);
  mesh2.position.set(50, 10, 0);

  const center1 = new THREE.Vector3(0, 0, 0);
  const center2 = new THREE.Vector3(50, 10, 0);
  const center3 = new THREE.Vector3(30, 20, 20);

  const direction1to2 = new THREE.Vector3()
    .subVectors(center2, center1)
    .normalize();
  const direction2to1 = new THREE.Vector3()
    .subVectors(center1, center2)
    .normalize();

  let direction1to3, ray3, intersectionPoint3, glbInt, distanceToGlb;

  const sphereRadius = 5;

  // Create spheres for intersection testing
  const sphere1 = new THREE.Sphere(center1, sphereRadius);
  const sphere2 = new THREE.Sphere(center2, sphereRadius);

  scene.updateMatrixWorld(true);

  // Raycasting to find intersection points
  const ray1 = new THREE.Raycaster(center1, direction1to2);
  const ray2 = new THREE.Raycaster(center2, direction2to1);
  // const ray2 = new THREE.Ray(center2, direction2to1);

  const intersectionPoint1 = new THREE.Vector3();
  const intersectionPoint2 = new THREE.Vector3();

  const intersects1 = ray1.intersectObjects([mesh1, mesh2]);
  const intRay2 = ray2.intersectObject(glbObj);

  // Calculate the distance between the two intersection points
  const distance = intersects1[1].point.distanceTo(intersects1[0].point);

  //   console.log("intersects1", intersects1);

  const arrowHelper0 = new THREE.ArrowHelper(
    direction1to2,
    intersects1[0].point,
    distance,
    0xffffff,
    2
  );
  scene.add(arrowHelper0);

  setTimeout(() => {
    direction1to3 = new THREE.Vector3()
      .subVectors(center3, center1)
      .normalize();

    ray3 = new THREE.Raycaster(center1, direction1to3);
    intersectionPoint3 = ray3.intersectObject(glbObj, true);

    glbInt = intersectionPoint3.length > 0 ? intersectionPoint3[0].point : null;
    distanceToGlb = glbInt.distanceTo(center1);
    console.log("intersectionPoint3", intersectionPoint3);
    const arrowHelper3 = new THREE.ArrowHelper(
      direction1to3,
      center1,
      distanceToGlb,
      0xffffff,
      2
    );
    scene.add(arrowHelper3);
  }, 1000);

  // if (intersectionPoint1.length() > 0) {
  //   const arrowHelper1 = new THREE.ArrowHelper(
  //     direction1to2,
  //     intersectionPoint1,
  //     distance,
  //     0xffffff,
  //     2
  //   );
  //   const arrowHelper2 = new THREE.ArrowHelper(
  //     direction2to1,
  //     intersectionPoint2,
  //     distance,
  //     0xffffff,
  //     2
  //   );
  //   scene.add(arrowHelper1);
  //   scene.add(arrowHelper2);
  // }
};

// Instantiate a loader

const animate = () => {
  renderer.render(scene, camera);
};

init();
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
