////------------------ GameSettingsContextProvider ------------------
// A custom context provider to make game settings available to other components,
// even at different nesting levels. Game settings have initial default values here,
// (player names, board size) but can also be modified by user at "GameSettingsForm". 

import React, { createContext, useContext, useState } from 'react';

const GameSettingsContext = createContext({});

export const useGameSettingsContext = () => useContext(GameSettingsContext);

export default function GameSettingsContextProvider({ children }) {
  const [playerNames, setPlayerNames] = useState({
    playerOne: 'Játékos 1',
    playerTwo: 'Játékos 2'
  });
  const [gameBoardSize, setGameBoardSize] = useState(10);
  const [isResetGameClicked, setIsResetGameClicked] = useState();

  return (
    <GameSettingsContext.Provider
      value={{
        playerNames,
        setPlayerNames,
        gameBoardSize,
        setGameBoardSize,
        isResetGameClicked,
        setIsResetGameClicked
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
}