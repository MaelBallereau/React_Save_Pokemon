// import CharacterPanel from "\components\InventoryPage\InventoryList.jsx";
// import ShopPanel from ".\components\InventoryPage\Shop.jsx";
import BackButton from "../components/InventoryPage/BackButton.jsx";
import InventoryList from "../components/InventoryPage/InventoryList.jsx";
// import Money from ".\components\InventoryPage\Money.jsx";
// import EntitySheet from ".\components\InventoryPage\EntitySheet.jsx";
import "../../public/styles/InventoryPage/style.scss";

export default function InventoryPage() {
  return (
    <>
      <div className="titles">
        <h1>Inventaire</h1>
      </div>
      <div className="pannel">
      <div>
        <InventoryList />
      </div>
      </div>

      <div>
      <BackButton />
    </div>
    </>
  );
}