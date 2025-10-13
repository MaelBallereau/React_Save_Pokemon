import { useState } from "react";

import { BrowserRouter } from "react-router";
import "./App.css";
import HomePage from "./pages/HomePage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
}

export default App;
