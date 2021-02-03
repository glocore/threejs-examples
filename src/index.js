import "./styles.css";
import * as Three from "three";

const canvas = document.getElementById("c");
const renderer = new Three.WebGLRenderer({ canvas });

const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new Three.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new Three.Scene();

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new Three.BoxGeometry(boxWidth, boxHeight, boxDepth);

const makeInstance = (geometry, color, x) => {
  const material = new Three.MeshPhongMaterial({ color });
  const cube = new Three.Mesh(geometry, material);

  cube.position.x = x;

  scene.add(cube);

  return cube;
};

const cubes = [
  makeInstance(geometry, 0x44aa88, 0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844, 2)
];

const color = 0xffffff;
const intensity = 1;
const light = new Three.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);

scene.add(light);

const render = (time) => {
  time *= 0.001; // time in seconds

  cubes.forEach((cube, index) => {
    const speed = 1 + index * 0.1;
    const rotation = time * speed;
    cube.rotation.x = rotation;
    cube.rotation.y = rotation;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

requestAnimationFrame(render);
