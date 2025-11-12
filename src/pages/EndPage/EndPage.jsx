import Button from "../../components/GlobalComponents/Button";
import { useGameContext } from "../../Context/GameContext";
import { useNavigate } from "react-router-dom";
import Quests from "../../data/quests.json";
import Npcs from "../../data/npcs.json";
import "./styles.scss";

export default function EndPage() {
  const { resetGame } = useGameContext();
  const navigate = useNavigate();

  const finalQuest = Quests.find((quest) => quest.id === 4);
  const pikachu = Npcs.find((npc) => npc.name === "Pikachu");

  const restart = () => {
    resetGame();
    navigate("/");
  };

  return (
    <main className="end-page">
      <div className="titles">
        <h1>Fin</h1>
      </div>

      <div className="end-content">
        {pikachu && (
          <img
            src={`/img/${pikachu.picture}`}
            alt={pikachu.name}
            className="end-pikachu"
          />
        )}

        {finalQuest && (
          <p className="end-story">
            {finalQuest.clue}
          </p>
        )}
      </div>

      <Button onClick={restart} text="Recommencer" />
    </main>
  );
}
