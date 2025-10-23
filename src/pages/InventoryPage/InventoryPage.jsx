import { useEffect, useState } from "react";
import "./styles.scss";

import CharacterCard from "../../components/HomePage/CharacterCard.jsx";
import InventoryList from "../../components/InventoryPage/InventoryList.jsx";
import ShopPanel from "../../components/InventoryPage/ShopPanel.jsx";
import DynamicBar from "../../components/GlobalComponents/DynamicBar.jsx";
import Button from "../../components/GlobalComponents/Button.jsx";

export default function InventoryPage() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const storedCharacter = localStorage.getItem("selectedcharacter");
    const storedInventory = localStorage.getItem("inventory");

    if (storedCharacter) setSelectedCharacter(JSON.parse(storedCharacter));
    if (storedInventory) setInventory(JSON.parse(storedInventory));
  }, []);

  const handleBack = () => {
    window.location.href = "/quete";
  };

  const handlePurchase = (item) => {
    if (!selectedCharacter) return;

    const totalCost = item.price * item.quantity;
    if (selectedCharacter.fortune < totalCost) {
      alert("Vous n'avez pas assez d'argent !");
      return;
    }

    const updatedCharacter = {
      ...selectedCharacter,
      fortune: selectedCharacter.fortune - totalCost,
    };
    setSelectedCharacter(updatedCharacter);
    localStorage.setItem("selectedcharacter", JSON.stringify(updatedCharacter));

    setInventory((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      let updatedInventory;
      if (existing) {
        updatedInventory = prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      } else {
        updatedInventory = [...prev, item];
      }
      localStorage.setItem("inventory", JSON.stringify(updatedInventory));
      return updatedInventory;
    });
  };

  return (
    <section className="inventory-page">
      <div className="titles">
        <h1>Inventaire</h1>
      </div>

      {selectedCharacter && (
        <div className="money-display">
          <img src="/img/money.png" alt="money" className="money-icon" />
          <span>{selectedCharacter.fortune}</span>
        </div>
      )}

      <div className="pannel">
        {selectedCharacter && (
          <div className="character-card-container">
            <div className="character-card-wrapper">
              <CharacterCard
                className="CharacterCard"
                avatar={`/img/${selectedCharacter.picture}`}
                firstname={selectedCharacter.name}
                race={selectedCharacter.class}
                health={
                  <DynamicBar
                    type="health"
                    value={selectedCharacter.health}
                    max={100}
                  />
                }
                energy={
                  <DynamicBar
                    type="energy"
                    value={selectedCharacter.mana}
                    max={100}
                  />
                }
                attack={selectedCharacter.damage}
                defense={selectedCharacter.defense}
                spells={
                  selectedCharacter.spell ? [selectedCharacter.spell] : []
                }
                isSelected={selectedCharacter.isSelected}
              />
            </div>
          </div>
        )}

        <InventoryList items={inventory} className="inventory-list" />
        <ShopPanel onPurchase={handlePurchase} className="shop-panel" />
      </div>
      <div className="backbutton">
        <Button onClick={handleBack} text="Retour" />
      </div>
    </section>
  );
}
