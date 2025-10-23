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
    JSON.parse(localStorage.getItem("inventory"))
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
    localStorage.setItem("inventory", JSON.stringify(inventory));
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
    setInventory(null);
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
