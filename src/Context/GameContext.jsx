import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const clearGame = () => {
  localStorage.clear();
};

export const GameProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(
    JSON.parse(localStorage.getItem("selectedcharacter"))
  );

  const [inventory, setInventory] = useState(
    JSON.parse(localStorage.getItem("items"))
  );

  useEffect(() => {
    if (selectedCharacter) {
      localStorage.setItem(
        "selectedcharacter",
        JSON.stringify(selectedCharacter)
      );
    }
  }, [selectedCharacter]);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(inventory));
  }, [inventory]);

  const setCharacter = (characterData) => {
    const newCharacter = {
      ...characterData,
      health: characterData.health ?? characterData.healthMax,
      mana: characterData.mana ?? characterData.manaMax,
      fortune: characterData.fortune,
    };
    setSelectedCharacter(newCharacter);
    localStorage.setItem("selectedcharacter", JSON.stringify(newCharacter));
  };

  const resetGame = () => {
    setSelectedCharacter(null);
    setInventory([]);
    clearGame();
  };

  return (
    <GameContext.Provider
      value={{
        selectedCharacter,
        setCharacter,
        setSelectedCharacter,
        inventory,
        setInventory,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
