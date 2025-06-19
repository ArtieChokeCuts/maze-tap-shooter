(function(global){
  function Maze(width, height) {
    this.width = width;
    this.height = height;
    this.grid = [];
    for (let y = 0; y < height; y++) {
      this.grid[y] = [];
      for (let x = 0; x < width; x++) {
        // 1 means wall, 0 means empty
        this.grid[y][x] = 1;
      }
    }
    this.generate();
  }

  Maze.prototype.generate = function() {
    for (let y = 1; y < this.height - 1; y++) {
      for (let x = 1; x < this.width - 1; x++) {
        if (Math.random() > 0.3) {
          this.grid[y][x] = 0;
        }
      }
    }
  };

  Maze.prototype.buildMeshes = function() {
    const walls = [];
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x] === 1) {
          const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(x, 0.5, y);
          walls.push(mesh);
        }
      }
    }
    return walls;
  };

  global.Maze = Maze;
})(this);
