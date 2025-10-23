import { useNavigate } from "react-router-dom";
import "./styles.scss";

export default function VictoryPage() {
  const navigate = useNavigate();

  const idQuest = localStorage.getItem("idQuest")-1;

  const handleNextQuest = () => {
    navigate("/quete");
  };

  return (
    <div className="victory-page">
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
