import { Routes, Route, BrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import QuestPage from "./pages/QuestPage";
import InventoryPage from "./pages/InventoryPage";
import FailurePage from "./pages/FailurePage";
import NotFoundpage from "./pages/NotFoundPage";
import { GameProvider } from "./Context/GameContext";
import CombatPage from "./pages/CombatPage";
import EndPage from "./pages/EndPage";
import VictoryPage from "./pages/VictoryPage";

function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quete" element={<QuestPage />} />
          <Route path="/inventaire" element={<InventoryPage />} />
          <Route path="/echec" element={<FailurePage />} />
          <Route path="/victoire" element={<VictoryPage />} />
          <Route path="/combat" element={<CombatPage />} />
          <Route path="/fin" element={<EndPage />} />
          <Route path="*" element={<NotFoundpage />} />
        </Routes>
      </GameProvider>
    </BrowserRouter>
  );
}

export default App;
