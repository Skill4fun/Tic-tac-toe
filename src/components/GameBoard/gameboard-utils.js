////------------------ generateInitialBoardState ------------------
// generating the initial two-dimensional (columns and rows) array for the tictactoe
// game board state, all elements are filled with value "null"

export const generateInitialBoardState = (cols, rows) => {
  const board = [];
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cols; j++) {
      board[i].push(null);
    }
  }
  // console.table(board);
  return board;
}

////------------------ transpose ------------------
// Tanspose the given matrix array (board). Map calls a provided callback function once for each element 
// in an array, in order and constructs a new array (transposed) from the results.callback 
export const transpose = (matrixArray) => {
  return matrixArray[0].map((col, i) => matrixArray.map(row => row[i]));
}