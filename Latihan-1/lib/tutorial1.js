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
    -1.0, -1.0, 0.0, 
    1.0, 1.0, 0.0, 
    -1.0, 1.0, 0.0, 
    1.0, 1.0, 0.0, 
    -1.0, 1.0, 0.0, 
    1.0, -1.0, 0.0
]);
geo_saya.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const mat_saya = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
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
  mesh_saya.rotation.y += 0.05;
  renderer.render(scene, camera);
}

draw();
