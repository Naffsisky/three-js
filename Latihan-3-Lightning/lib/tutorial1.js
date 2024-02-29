const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

scene.background = new THREE.Color("0x0a0a0a");

const box = new THREE.BoxGeometry(1, 1, 1);
const boxMat2 = new THREE.MeshPhongMaterial({
  color: 0xff0000,
});

const cube2 = new THREE.Mesh(box, boxMat2);
cube2.receiveShadow = true
cube2.castShadow = true
scene.add(cube2);

const plane = new THREE.PlaneGeometry(1000, 1000, 500, 500);

const planeMaterial = new THREE.MeshLambertMaterial({
  color: 0xaaffaa,
});

const planeMesh = new THREE.Mesh(plane, planeMaterial);
planeMesh.receiveShadow = true;
planeMesh.position.set(0, -1, 0);
planeMesh.rotation.x = -Math.PI / 2;
scene.add(planeMesh);

// const ambient = new THREE.AmbientLight(0x404040);
// scene.add(ambient);

// const pointLight = new THREE.PointLight(0xffffff, 1, 20);
// pointLight.position.set(0, 4, 2);
// scene.add(pointLight);
// scene.add(new THREE.PointLightHelper(pointLight, 0.3, 0xff0000));

// const hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
// scene.add(hemi);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
// directionalLight.position.set(2, 2, 0)
// directionalLight.target.position.set(0, 0, 0);
// directionalLight.target.updateMatrixWorld();
// scene.add(directionalLight);
// scene.add(new THREE.DirectionalLightHelper(directionalLight, 0.3, 0x00ff00));

const spotLight = new THREE.SpotLight(0xffffff, 1.5, 20);
spotLight.position.set(2, 3, 0);
spotLight.target.position.set(0, 0, 0);
spotLight.castShadow = true;
spotLight.target.updateMatrixWorld();
scene.add(spotLight)
scene.add(new THREE.SpotLightHelper(spotLight));

camera.position.z += 15; // Mengubah camera.position.z += 15 menjadi camera.position.z = 5

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function draw() {
  requestAnimationFrame(draw);

  cube2.rotation.x += 0.005;
  cube2.rotation.y += 0.005;

  renderer.render(scene, camera);
}

draw();
