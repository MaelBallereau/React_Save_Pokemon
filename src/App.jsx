import { Routes, Route, BrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import QuestPage from "./pages/QuestPage";
import InventoryPage from "./pages/InventoryPage";
import FailurePage from "./pages/FailurePage";
import NotFoundpage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quete" element={<QuestPage />} />
        <Route path="/inventaire" element={<InventoryPage />} />
        <Route path="/echec" element={<FailurePage />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
