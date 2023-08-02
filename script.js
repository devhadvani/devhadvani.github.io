import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/DRACOLoader.js";
import datGui from 'https://cdn.skypack.dev/dat.gui';

const cont = document.getElementById('cont');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;

const gui = new datGui.GUI();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
cont.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff,10);
scene.add(light);

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);

loader.load('model.glb', function (gltf) {
    const color = 0x151515; // Red color
    const material = new THREE.MeshBasicMaterial({ color });
    
    // Traverse the model's hierarchy to apply the material to all meshes
    gltf.scene.traverse((node) => {
      if (node.isMesh) {
        node.material = material;
      }
    });

    scene.add(gltf.scene);
    gui.add(gltf.scene.rotation, 'x').min(0).max(9);
    gui.add(gltf.scene.rotation, 'y').min(0).max(9);
    gui.add(gltf.scene.rotation, 'z').min(0).max(9);
    gui.add(gltf.scene.position, 'x').min(0).max(9);
    gui.add(gltf.scene.position, 'y').min(-10).max(9);
    gui.add(gltf.scene.position, 'z').min(0).max(9);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
