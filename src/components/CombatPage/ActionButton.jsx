import { useState } from "react";

export default function CombatActions({ onAttack, onFlee }) {
  const [actionMessage, setActionMessage] = useState("");

  const handleAttack = () => {
    if (onAttack) {
      const message = onAttack();
      setActionMessage(message || "Tu attaques l'ennemi !");
    }
  };

  const handleFlee = () => {
    if (onFlee) {
      const message = onFlee();
      setActionMessage(message || "Fuite");
    }
  };

  return (
    <div className="combat-actions">
      <button className="attack-btn" onClick={handleAttack}>
        Attaquer
      </button>
      <button className="flee-btn" onClick={handleFlee}>
        Fuir
      </button>
      {actionMessage && <p className="action-message">{actionMessage}</p>}
    </div>
  );
}
