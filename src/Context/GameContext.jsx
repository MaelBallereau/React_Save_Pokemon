import React, { createContext, useContext, useState} from "react";


const GameContext = createContext();

export const clearGame = () => {
  localStorage.clear();
};

export const GameProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const resetGame = () => {
    setSelectedCharacter(null);
    clearGame();
  };

 

  return (
    <GameContext.Provider
      value={{ selectedCharacter, setSelectedCharacter, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
};
export const useGameContext = () => useContext(GameContext);
