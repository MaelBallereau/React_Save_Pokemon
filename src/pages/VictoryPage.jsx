import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../public/styles/VictoryPage/styles.scss";

export default function VictoryPage() {
  const [questId, setQuestId] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuest = localStorage.getItem("idQuest");
    setQuestId(savedQuest ? parseInt(savedQuest, 10) : 0);
  }, []);

  const handleNextQuest = () => {
    const newQuest = questId + 1;
    localStorage.setItem("idQuest", newQuest);
    navigate("/quete");
  };
  useEffect(() => {
    const questIndex = localStorage.getItem("idQuest");
    if (questIndex >= 5) {
      navigate("/fin");
    }
  }, []);

  return (
    <div className="victory-page">
      <div className="card">
        <h1 className="pokemon-title">✨ Victoire ! ✨</h1>
        <p className="subtitle">
          Tu as vaincu ton adversaire à la quête {questId} !
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
