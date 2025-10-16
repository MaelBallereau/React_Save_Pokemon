import Button from "../components/GlobalComponents/Button";
import { useGameContext } from "../Context/GameContext";
import { useNavigate } from "react-router-dom";
import "../../public/styles/EndPage/styles.scss";

export default function EndPage() {
  const { resetGame } = useGameContext();
  const navigate = useNavigate();

  const restart = () => {
    resetGame();
    navigate("/");
  };

  return (
    <main className="end-page">
      <div className="titles">
        <h1>Fin</h1>
      </div>
      <Button onClick={restart} text="Recommencer" />
    </main>
  );
}
