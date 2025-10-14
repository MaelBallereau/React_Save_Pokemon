import { useEffect, useState } from "react";

import "../../public/styles/InventoryPage/styles.scss";
import "../../public/styles/HomePage/styles.scss";

import CharacterCard from "../components/HomePage/CharacterCard.jsx";
import BackButton from "../components/InventoryPage/BackButton.jsx";
import InventoryList from "../components/InventoryPage/InventoryList.jsx";
import ShopPanel from "../components/InventoryPage/ShopPanel.jsx";

export default function InventoryPage() {
  const [selectedcharacter, setselectedcharacter] = useState(null);
  
  useEffect(() => {
    const storedData = localStorage.getItem("selectedcharacter");
    if (storedData) {
      setselectedcharacter(JSON.parse(storedData));
    }
  }, []);

  return (
    <>
      <div className="titles">
        <h1>Inventaire</h1>
      </div>

      <div className="pannel">
        {selectedcharacter && (
          <CharacterCard className="character-card" data={selectedcharacter} />
        )}
        <InventoryList className="inventory-list" />
        <ShopPanel className="shop-panel" />
      </div>

      <BackButton />
    </>
  );
}
