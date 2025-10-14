import { Routes, Route, BrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import QuestPage from "./pages/QuestPage";
import FailurePage from "./pages/FailurePage";
import NotFoundpage from "./pages/NotFoundpage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventaire" element={<InventoryPage />} />
        <Route path="/quete" element={<QuestPage />} />
        <Route path="/echec" element={<FailurePage />} />
        <Route path="*" element={<NotFoundpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
