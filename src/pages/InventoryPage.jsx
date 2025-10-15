import { useEffect, useState } from "react";

import "../../public/styles/InventoryPage/styles.scss";
import "../../public/styles/HomePage/styles.scss";

import CharacterCard from "../components/HomePage/CharacterCard.jsx";
import InventoryList from "../components/InventoryPage/InventoryList.jsx";
import ShopPanel from "../components/InventoryPage/ShopPanel.jsx";
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
    <>
      <div className="titles">
        <h1>Mon Inventaire</h1>
      </div>

      <div className="pannel">
        {selectedCharacter && (
          <CharacterCard className="CharacterCard" avatar={ `/img/${selectedCharacter.picture}`}
           firstname={selectedCharacter.name} 
           race={selectedCharacter.class} 
           health={selectedCharacter.health} 
           energy={selectedCharacter.mana} 
           attack={selectedCharacter.damage} 
           defense={selectedCharacter.defense} 
           money={selectedCharacter.fortune} 
           spells={selectedCharacter.spell? [selectedCharacter.spell] : []} 
           onClick={selectedCharacter.onClick} 
           isSelected={selectedCharacter.isSelected} />
        )}
        <InventoryList className="inventory-list" />
        <ShopPanel className="shop-panel" />
      </div>

      <Button onClick={handleBack} text="Retour" />
    </>
  );
}

  
  
 