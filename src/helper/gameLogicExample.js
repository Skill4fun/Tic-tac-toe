let board = [
  [11, 12, 13, 14, 15],
  [21, 22, 23, 24, 25],
  [31, 32, 33, 34, 35],
  [41, 42, 43, 44, 45],
  [51, 52, 53, 54, 55]
]

let boardReverse = board.map(row => [...row].reverse());

export function getDiagonal(board, x, y, dx, dy) {
  let diag = [];
  while (Array.isArray(board[x]) && typeof board[x][y] !== 'undefined') {
    diag.push(board[x][y]);
    x += dx;
    y += dy;
  }
  return diag;
}

