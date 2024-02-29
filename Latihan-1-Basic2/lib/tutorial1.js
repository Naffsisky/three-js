/*

Scene
    - Lingkungan 3D yang akan menjadi aplikasi
    - 3D world
Camera
    - Kamera yang digunakan untuk melihat objek
Renderer
    - Hasil rendering dari objek

*/

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
/*

Jenis Kamera
    1. POV Perspektif
    2. Aspect ratio
    3. Near clip (jarak visible terdekat)
    4. Far clip (jarak visible terjauh)
*/
var renderer = new THREE.WebGLRenderer();

// var box = new THREE.BoxGeometry(1, 1, 1);
// var boxMat = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// var boxMesh = new THREE.Mesh(box, boxMat);

// scene.add(boxMesh);

const geo_saya = new THREE.BufferGeometry();
let vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

  -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
]);

let colors = new Float32Array([
  1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

  0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
]);

geo_saya.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geo_saya.setAttribute("color", new THREE.BufferAttribute(colors, 3));
geo_saya.setIndex([
  0, 3, 1, 1, 2, 0,

  4, 6, 5, 5, 7, 4,

  4, 0, 2, 2, 6, 4,

  5, 1, 3, 3, 7, 5,

  1, 5, 6, 6, 2, 1,

  0, 4, 7, 7, 3, 0,
]);

const mat_saya = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });
const mesh_saya = new THREE.Mesh(geo_saya, mat_saya);
scene.add(mesh_saya);

camera.position.z = 5;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  renderer.setSize(this.window.innerWidth, this.window.innerHeight);
  camera.aspect = this.window.innerWidth / this.window.innerHeight;
  camera.updateProjectionMatrix();
});

function draw() {
  requestAnimationFrame(draw);
  mesh_saya.rotation.y += 0.01;
  mesh_saya.rotation.x += 0.01;
  renderer.render(scene, camera);
}

draw();
