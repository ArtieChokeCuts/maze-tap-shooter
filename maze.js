export const mazeGrid = [
  [1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
];

export let player = { x: 1, y: 1 };

export function canMoveTo(x, y) {
  return mazeGrid[y] && mazeGrid[y][x] === 0;
}

export function movePlayer(direction) {
  const { x, y } = player;
  if (direction === 'left' && canMoveTo(x - 1, y)) player.x--;
  if (direction === 'right' && canMoveTo(x + 1, y)) player.x++;
  if (direction === 'forward' && canMoveTo(x, y - 1)) player.y--;
}

export function getEncounter(x, y) {
  const key = `${x},${y}`;
  const map = {
    '1,1': 'none',
    '2,1': 'enemy',
    '3,1': 'civilian',
    '1,2': 'enemy',
    '3,2': 'enemy',
    '1,3': 'civilian',
    '2,3': 'enemy',
    '3,3': 'none'
  };
  return map[key] || 'none';
}
