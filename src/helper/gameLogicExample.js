////------------------ gameLogixEcample ------------------
// A few simple examples to illustrate the game logic. The code below is not used anywhere in the App.

let board = [
  [11, 12, 13, 14, 15],
  [21, 22, 23, 24, 25],
  [31, 32, 33, 34, 35],
  [41, 42, 43, 44, 45],
  [51, 52, 53, 54, 55]
]

let boardReverse = board.map(row => [...row].reverse());

export function getDiagonal(board, x, y) {
  let diag = [];
  while (Array.isArray(board[x]) && typeof board[x][y] !== 'undefined') {
    diag.push(board[x][y]);
    x += 1;
    y += 1;
  }
  return diag;
}



function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}