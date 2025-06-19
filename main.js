(function(){
  const container = document.getElementById('game-container');
  const hudScore = document.getElementById('score');
  let score = 0;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  const maze = new Maze(10, 10);
  const walls = maze.buildMeshes();
  walls.forEach(w => scene.add(w));

  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x222222 });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(4.5, 0, 4.5);
  scene.add(plane);

  camera.position.set(5, 10, 15);
  camera.lookAt(5, 0, 5);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onClick(event) {
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(walls);
    if (intersects.length > 0) {
      const hit = intersects[0].object;
      scene.remove(hit);
      const index = walls.indexOf(hit);
      if (index !== -1) walls.splice(index, 1);
      score += 1;
      hudScore.textContent = 'Score: ' + score;
    }
  }

  renderer.domElement.addEventListener('click', onClick);

  window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
})();
