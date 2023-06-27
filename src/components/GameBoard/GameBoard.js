////------------------ GameBoard ------------------
// Custom component for the tic-tac-toe gameboard

import React, { useState, useEffect } from 'react';
import './GameBoard.scss';
import { generateInitialBoardState, transpose } from './gameboard-utils'
import { useLoggedInUserContext } from '../../helper/LoggedInUserContextProvider';
import { useGameSettingsContext } from '../../helper/GameSettingsContextProvider';
import Alert from '../Alert';
import GameSettingsForm from './GameSettingsForm';

export default function GameBoard() {
  const { loggedInUser } = useLoggedInUserContext();
  const { playerNames, gameBoardSize, isResetGameClicked } = useGameSettingsContext();
  const cols = gameBoardSize;
  const rows = gameBoardSize;
  const [board, setBoard] = useState(generateInitialBoardState(cols, rows));
  const [symbol, setSymbol] = useState('X');
  const [winner, setWinner] = useState(null);


  ////------------------ checkWinnerInRow ------------------
  // checks the number of symbols in the given array (row), if 5 symbols are found, it checks 
  // the symbol("X" or "O") and returns the name of the winning player, else returns "null"
  function checkWinnerInRow(row) {
    let symbolCount = 0;
    for (let item of row) {
      if (item === symbol) {
        symbolCount++;
      } else {
        symbolCount = 0;
      }
      if (symbolCount === 5) {
        if (symbol === 'X') return playerNames.playerOne;
        if (symbol === 'O') return playerNames.playerTwo;
      }
    }
    return null;
  }

  ////------------------ checkWinnerInAllRows ------------------
  // checks if there is a winner in any of the rows given matrix array and returns 
  // winners name, else returns "null"
  function checkWinnerInAllRows(matrix) {
    for (let row of matrix) {
      const winner = checkWinnerInRow(row);
      if (winner !== null) {
        return winner;
      }
    }
    return null;
  }

  ////------------------ getWinner ------------------
  // 
  function getWinner(board) {
    // Transpose the board (matrix) array to make it easier to check the winner 
    // in both horizontal and vertical dimensions later with "checkWinnerInAllRows"
    const boardTransposed = transpose(board);

    // An array to collect all possible fields, arranged in rows one below the other, 
    // where we will later check if 5 identical symbols have been collected in any row
    let allPossibleWinningFields = [
      ...board,              //horizontal array 
      ...boardTransposed     //vertically transposed board array 
    ]

    // Create a reversed/mirrored array from board to make it simplier to check the diagonals 
    // in both ways (main and cross) with "getDiagonalItems" function 
    let boardReverse = board.map(row => [...row].reverse());

    // Determine the indexes of possible diagonal positioned items (in the matrix) for a 
    // given x/y-index of the board (>> one right one down) and return their values in an array "diag"
    function getDiagonalItems(board, x, y) {
      let diag = [];
      while (Array.isArray(board[x]) && typeof board[x][y] !== 'undefined') {
        diag.push(board[x][y]); //push value into diag array
        x += 1;                 //move right
        y += 1;                 //move down
      }
      return diag;
    }

    let maxLength = Math.max(cols, rows);

    for (let i = 0; i < maxLength; i++) {
      // get all main diagonals in first column of the board matrix
      allPossibleWinningFields.push(getDiagonalItems(board, 0, i));

      // get al cross-diagonals in first column of the board matrix
      allPossibleWinningFields.push(getDiagonalItems(boardReverse, 0, i));

      // get all main diagonals in first row of the board matrix
      allPossibleWinningFields.push(getDiagonalItems(board, i, 0));

      // get all main cross-diagonals in first row of the board matrix
      allPossibleWinningFields.push(getDiagonalItems(boardReverse, i, 0));
    }

    // Filter min 5 length field arrays in allPossibleWinningFields 
    allPossibleWinningFields = allPossibleWinningFields.filter((fieldsArr) => fieldsArr.length >= 5);

    // Check whether we have 5 indentical symbols in any rows of "allPossibleWinningFields" matrix array
    return checkWinnerInAllRows(allPossibleWinningFields);
  }

  ////------------------ handleCellClick ------------------
  // Events at the time a cell is clicked
  const handleCellClick = (e) => {

    // get the row and column indexes from dataset atribute of the cell
    const { row, col } = e.target.dataset

    // make the cell unclickable if the clicked cells value is not null, or we already have a winner
    if (board[row]?.[col] !== null || winner !== null) return;

    // instead of [...board], we deep clone the board into the modifiedBoard 
    // so that the board remains unchanged(immutable)
    const modifiedBoard = JSON.parse(JSON.stringify(board));

    modifiedBoard[row][col] = symbol;        // set the value of the clicked cells to the preset symbol
    setBoard(modifiedBoard);                 // update board state
    setWinner(getWinner(modifiedBoard));     // update winner state
    setSymbol(symbol === "X" ? "O" : "X");   // update symbol state
  }

  ////------------------ useEffect ------------------
  // Load initial board and winner satates, update them if something changes by user
  useEffect(() => {
    setBoard(generateInitialBoardState(cols, rows));
    setWinner(null);
  }, [isResetGameClicked, gameBoardSize, cols, rows]);

  ////------------------ getCellClassName ------------------
  // Generate custom conditional className-s for cells 
  function getCellClassName(cellValue, winnersName) {
    if (cellValue === null && winnersName === null) return "empty";
    if (winnersName === playerNames.playerOne) return "winner-x";
    if (winnersName === playerNames.playerTwo) return "winner-o";
  }


  return (
    <div className="gameboard-container">
      {(loggedInUser === true)
        ? (
          <>
            <GameSettingsForm />
            {!!winner
              ? (
                <Alert theme={winner === playerNames.playerOne ? 'success' : 'danger'}>
                  <p>Győztes játékos:</p>
                  <h3>{winner}</h3>
                </Alert>)
              : (symbol === 'X'
                ?
                <Alert theme={'success'}>
                  <p>Következő játékos:</p>
                  <h3>{playerNames.playerOne}</h3>
                </Alert>
                :
                <Alert theme={'danger'}>
                  <p>Következő játékos:</p>
                  <h3>{playerNames.playerTwo}</h3>
                </Alert>
              )
            }
            <table className="tictactoe-board">
              <tbody>
                {board.map((row, rowIdx) => (
                  <tr
                    key={`${row + rowIdx}`}>
                    {row.map((col, colIdx) => (
                      <td
                        key={`${col + colIdx}`}
                        className={"tictactoe-cell " + getCellClassName(row[colIdx], winner)}
                        onClick={handleCellClick}
                        data-row={rowIdx}
                        data-col={colIdx}
                      >
                        <div
                          style={{ "width": "40px" }} >
                          {row[colIdx]}
                        </div>
                      </td>))}
                  </tr>))}
              </tbody>
            </table>
          </>
        ) : (
          <Alert theme={'warning'}>
            A játékhoz be kell jelentkezned!
          </Alert>
        )}
    </div >
  );
};