import { Routes, Route, BrowserRouter } from "react-router";

import HomePage from "./pages/HomePage";
import QuestPage from "./pages/QuestPage";
import FailurePage from "./pages/FailurePage"; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inventaire" element={<HomePage />} />
        <Route path="/quete" element={<QuestPage />} />
        <Route path="/combat" element={<HomePage />} />
        <Route path="/victoire" element={<HomePage />} />
        <Route path="/echec" element={<FailurePage />} />
        <Route path="/fin" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;