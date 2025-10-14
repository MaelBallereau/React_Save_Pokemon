import { Routes, Route, BrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import InventoryPage from "./pages/InventoryPage";
import FailurePage from "./pages/FailurePage"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventaire" element={<InventoryPage />} />
        <Route path="/quete" element={<FailurePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;