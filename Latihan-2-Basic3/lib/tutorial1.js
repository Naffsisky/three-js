var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

const geo_saya = new THREE.BoxGeometry(1, 1, 1);
const wood_texture = new THREE.TextureLoader().load("assets/wood.jpg");
const A_texture = new THREE.TextureLoader().load("assets/1.jpg");
const B_texture = new THREE.TextureLoader().load("assets/2.jpg");
const C_texture = new THREE.TextureLoader().load("assets/3.jpg");
const D_texture = new THREE.TextureLoader().load("assets/4.jpg");
const E_texture = new THREE.TextureLoader().load("assets/dust.tif");

const mat_array = [
  new THREE.MeshBasicMaterial({ map: A_texture }),
  new THREE.MeshBasicMaterial({ map: B_texture }),
  new THREE.MeshBasicMaterial({ map: C_texture }),
  new THREE.MeshBasicMaterial({ map: D_texture }),
  new THREE.MeshBasicMaterial({ map: E_texture }),
  new THREE.MeshBasicMaterial({ map: A_texture }),
];

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

// kotak 1
const mat_saya = new THREE.MeshBasicMaterial({ map: wood_texture });
const mesh_saya = new THREE.Mesh(geo_saya, mat_saya);
mesh_saya.position.set(-1, 0, 0);
mesh_saya.scale.set(0.5, 0.5, 0.5);
scene.add(mesh_saya);

// kotak 2
const light1 = new THREE.PointLight(0xffffff, 1);
light1.position.set(0, 3, 2);
scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 1);
light1.position.set(1, -3, 2);
scene.add(light2);

const mat_saya2 = new THREE.MeshLambertMaterial({ map: wood_texture, emissive: 0x111111, emissiveIntensity: 0.5 });
const mesh_saya2 = new THREE.Mesh(geo_saya, mat_saya2);
mesh_saya2.position.set(1, 0, 0);
mesh_saya2.scale.set(0.5, 0.5, 0.5);
scene.add(mesh_saya2);

// kotak 3
const mat_saya3 = new THREE.MeshPhongMaterial({ map: wood_texture, shininess: 100 });
const mesh_saya3 = new THREE.Mesh(geo_saya, mat_saya3);
mesh_saya3.position.set(2.7, 0, 0);
mesh_saya3.scale.set(0.5, 0.5, 0.5);
scene.add(mesh_saya3);

// kotak 4
const mesh_saya4 = new THREE.Mesh(geo_saya, mat_array);
mesh_saya4.position.set(-2.7, 0, 0);
mesh_saya4.scale.set(0.5, 0.5, 0.5);
scene.add(mesh_saya4);

// kotak 5
const geo_2nd = new THREE.BufferGeometry();
let verticesz = new Float32Array([
  -1.0, -1.0, 0.0, 1.0, -1.0, 0.0, 1.0, 1.0, 0.0,

  1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0,
]);

let uvs = new Float32Array([0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0]);

let indices = new Uint16Array([
  0,
  1,
  2, // Triangle ABC
  3,
  4,
  5, // Triangle ACD
]);

geo_2nd.setAttribute("position", new THREE.BufferAttribute(verticesz, 3));
geo_2nd.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
geo_2nd.setIndex(new THREE.BufferAttribute(indices, 1));

let material_2nd = new THREE.MeshBasicMaterial({ color: 0xff0000, map: D_texture });
let mesh2 = new THREE.Mesh(geo_2nd, material_2nd);
mesh2.position.set(0, 1.0, 0);
mesh2.scale.set(0.5, 0.5, 0.5);
scene.add(mesh2);

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

  mesh_saya.rotation.y += 0.005;
  mesh_saya.rotation.x += 0.005;

  mesh_saya2.rotation.y -= 0.005;
  mesh_saya2.rotation.x += 0.005;

  mesh_saya3.rotation.y -= 0.005;
  mesh_saya3.rotation.x += 0.005;

  mesh_saya4.rotation.y -= 0.005;
  mesh_saya4.rotation.x -= 0.005;

  mesh2.rotation.y -= 0.005;
  mesh2.rotation.x -= 0.005;

  renderer.render(scene, camera);
}

draw();
