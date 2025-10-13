import { Routes, Route, BrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
// import QuestPage from "./pages/QuestPage";
// import BattlePage from "./pages/BattlePage";
// import VictoryPage from "./pages/VictoryPage";
// import FailPage from "./pages/FailPage";
// import EndPage from "./pages/EndPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventaire" element={<InventoryPage />} />
        {/* <Route path="/quete" element={<QuestPage />} /> */}
        {/* <Route path="/combat" element={<BattlePage />} /> */}
        {/* <Route path="/victoire" element={<VictoryPage />} /> */}
        {/* <Route path="/echec" element={<FailPage />} /> */}
        {/* <Route path="/fin" element={<EndPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
