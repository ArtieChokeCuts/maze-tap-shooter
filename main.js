let score = 0; let ammo = 15; let penalties = 0;

const scoreEl = document.getElementById('score'); const ammoEl = document.getElementById('ammo'); const penaltiesEl = document.getElementById('penalties');

const directions = ['forward', 'left', 'right'];

// Simulated maze position let position = 0;

function updateHUD() { scoreEl.textContent = score; ammoEl.textContent = ammo; penaltiesEl.textContent = penalties; }

function shootTarget(isEnemy) { if (ammo <= 0) return; ammo--; if (isEnemy) { score += 10; } else { penalties++; } updateHUD(); spawnTarget(); }

function spawnTarget() { // Simulate random target appearance const isEnemy = Math.random() > 0.4; const target = document.createElement('div'); target.textContent = isEnemy ? '👾' : '👵'; target.style.position = 'absolute'; target.style.top = '40%'; target.style.left = '50%'; target.style.transform = 'translate(-50%, -50%)'; target.style.fontSize = '4em'; target.style.cursor = 'pointer'; target.onclick = () => { shootTarget(isEnemy); target.remove(); }; document.body.appendChild(target); setTimeout(() => target.remove(), 2000); }

function move(direction) { position++; spawnTarget(); }

document.getElementById('forward').onclick = () => move('forward'); document.getElementById('left').onclick = () => move('left'); document.getElementById('right').onclick = () => move('right');

updateHUD(); spawnTarget();

