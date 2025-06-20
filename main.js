import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';

let score = 0;
let ammo = 15;
let penalties = 0;

const scoreEl = document.getElementById('score');
const ammoEl = document.getElementById('ammo');
const penaltiesEl = document.getElementById('penalties');

function updateHUD() {
  scoreEl.textContent = score;
  ammoEl.textContent = ammo;
  penaltiesEl.textContent = penalties;
}

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const light = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(light);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.6, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ground
const groundGeometry = new THREE.PlaneGeometry(10, 200);
const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x222222 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Walls
function createWall(offset) {
  const geo = new THREE.BoxGeometry(0.5, 2, 200);
  const mat = new THREE.MeshPhongMaterial({ color: 0x555555 });
  const wall = new THREE.Mesh(geo, mat);
  wall.position.set(offset, 1, -100);
  scene.add(wall);
}
createWall(-5);
createWall(5);

const enemyMaterial = new THREE.MeshPhongMaterial({ color: 0xff4444 });
const civilianMaterial = new THREE.MeshPhongMaterial({ color: 0x44ccff });
const targetGeometry = new THREE.BoxGeometry(1, 1, 0.2);
let targets = [];

function spawnTarget() {
  const isEnemy = Math.random() > 0.4;
  const mat = isEnemy ? enemyMaterial : civilianMaterial;
  const mesh = new THREE.Mesh(targetGeometry, mat);
  mesh.position.set((Math.random() - 0.5) * 6, 0.5, camera.position.z - 15);
  mesh.userData.isEnemy = isEnemy;
  scene.add(mesh);
  targets.push(mesh);
  setTimeout(() => removeTarget(mesh), 3000);
}

function removeTarget(t) {
  const index = targets.indexOf(t);
  if (index !== -1) {
    scene.remove(t);
    targets.splice(index, 1);
  }
}

function shoot() {
  if (ammo <= 0) return;
  ammo--;
  updateHUD();

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  const hits = raycaster.intersectObjects(targets);
  if (hits.length > 0) {
    const target = hits[0].object;
    if (target.userData.isEnemy) {
      score += 10;
    } else {
      penalties += 1;
    }
    removeTarget(target);
    updateHUD();
  }
}

function reload() {
  ammo = 15;
  updateHUD();
}

document.addEventListener('click', shoot);
document.getElementById('reload').addEventListener('click', reload);

function animate() {
  requestAnimationFrame(animate);
  camera.position.z -= 0.05;
  if (Math.random() < 0.02) spawnTarget();
  renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

updateHUD();
animate();

