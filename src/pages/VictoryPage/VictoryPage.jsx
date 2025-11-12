import { useNavigate } from "react-router-dom";
import { useGameContext } from "../../Context/GameContext.jsx";
import { useEffect, useState } from "react";
import Quest from "../../data/quests.json";
import "./styles.scss";

export default function VictoryPage() {
  const navigate = useNavigate();
  const { setSelectedCharacter, selectedCharacter } = useGameContext();
  const [showGoldPopup, setShowGoldPopup] = useState(false);
  const idQuest = localStorage.getItem("idQuest") - 1;
  const currentQuest = Quest.find((q) => q.id === idQuest);
  const rewardGold = currentQuest?.reward?.gold;

  useEffect(() => {
    if (rewardGold) {
      const storedCharacter = JSON.parse(localStorage.getItem("selectedcharacter"));

      const updatedCharacter = {
        ...storedCharacter,
        fortune: (storedCharacter.fortune || 0) + rewardGold,
      };

      setSelectedCharacter(updatedCharacter);

      setShowGoldPopup(true);

      const timer = setTimeout(() => setShowGoldPopup(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNextQuest = () => {
    navigate("/quete");
  };

  return (
    <div className="victory-page">
      {showGoldPopup && (
        <div className="gold-popup">
          <img src="/img/money.png" alt="gold" />
          <span>+{rewardGold} Gold !</span>
        </div>
      )}
      <div className="card">
        <h1 className="pokemon-title">✨ Victoire ! ✨</h1>
        <p className="subtitle">
          Tu as vaincu ton adversaire à la quête {idQuest} !
        </p>
        <div className="pokeball">
          <img src="/img/pokeball.png" alt="pokeball" />
        </div>

        <button className="next-btn" onClick={handleNextQuest}>
          Continuer l’aventure ➜
        </button>
      </div>
    </div>
  );
}
