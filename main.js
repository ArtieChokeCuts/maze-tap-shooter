// main.js

import { player, movePlayer, getEncounter } from './maze.js';

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

function handleMove(dir) {
  movePlayer(dir);
  const encounter = getEncounter(player.x, player.y);
  if (encounter !== 'none') showTarget(encounter);
  updateHUD();
}

function showTarget(type) {
  if (ammo <= 0) return alert('Out of ammo!');
  const result = confirm(`You see a ${type}. Shoot?`);
  ammo--;
  if ((type === 'enemy' && result) || (type === 'civilian' && !result)) {
    score += 10;
  } else {
    penalties++;
  }
}

document.getElementById('left').addEventListener('click', () => handleMove('left'));
document.getElementById('right').addEventListener('click', () => handleMove('right'));
document.getElementById('forward').addEventListener('click', () => handleMove('forward'));

updateHUD();
