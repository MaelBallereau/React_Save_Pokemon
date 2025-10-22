import { useEffect, useState } from "react";

import "./styles.scss";

import CharacterCard from "../components/HomePage/CharacterCard.jsx";
import InventoryList from "../components/InventoryPage/InventoryList.jsx";
import ShopPanel from "../components/InventoryPage/ShopPanel.jsx";
import DynamicBar from "../components/GlobalComponents/DynamicBar.jsx";
import Button from "../components/GlobalComponents/Button.jsx";

export default function InventoryPage() {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("selectedcharacter");
    if (storedData) {
      setSelectedCharacter(JSON.parse(storedData));
    }
  }, []);

  const handleBack = () => {
    window.location.href = "/quete";
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
                health={selectedCharacter.health}
                energy={
                  <DynamicBar
                    type="energy"
                    value={selectedCharacter.mana}
                    max={100}
                  />
                }
                attack={selectedCharacter.damage}
                defense={selectedCharacter.defense}
                spells={selectedCharacter.spell ? [selectedCharacter.spell] : []}
                isSelected={selectedCharacter.isSelected}
              />
            </div>
          </div>
        )}

        <InventoryList className="inventory-list" />
        <ShopPanel className="shop-panel" />
      </div>

      <Button onClick={handleBack} text="Retour" />
    </section>
  );
}
