import { createContext, useContext, useState, useEffect } from "react";

const GameContext = createContext();

export const clearGame = () => {
  localStorage.clear();
};

export const GameProvider = ({ children }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(
    JSON.parse(localStorage.getItem("selectedcharacter") || "null")
  );

  const [inventory, setInventory] = useState(
    JSON.parse(localStorage.getItem("items") || "[]")
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
      health: characterData.health ?? characterData.healthMax ?? 100,
      mana: characterData.mana ?? characterData.manaMax ?? 50,
      fortune: characterData.fortune ?? 0,
    };
    setSelectedCharacter(newCharacter);
    localStorage.setItem("selectedcharacter", JSON.stringify(newCharacter));
  };

  const healCharacter = (amount) => {
    setSelectedCharacter((prev) => ({
      ...prev,
      health: Math.min(prev.healthMax, prev.health + amount),
    }));
  };

  const regenMana = (amount) => {
    setSelectedCharacter((prev) => ({
      ...prev,
      mana: Math.min(prev.manaMax, prev.mana + amount),
    }));
  };

  const useItem = (itemId) => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;

    if (item.target === "health") healCharacter(item.amount);
    if (item.target === "mana") regenMana(item.amount);

    setInventory((prev) => prev.filter((i) => i.id !== itemId));
  };

  const addFortune = (amount) => {
    setSelectedCharacter((prev) => ({
      ...prev,
      fortune: (prev.fortune || 0) + amount,
    }));
  };

  const removeFortune = (amount) => {
    setSelectedCharacter((prev) => ({
      ...prev,
      fortune: Math.max(0, (prev.fortune || 0) - amount),
    }));
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
        healCharacter,
        regenMana,
        useItem,
        addFortune,
        removeFortune,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
