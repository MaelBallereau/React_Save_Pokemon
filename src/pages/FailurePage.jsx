import "../../public/styles/FailurePage/styles.scss";
import Description from "../components/FailurePage/Description";
import Button from "../components/GlobalComponents/Button";
import { useGameContext } from "../Context/GameContext";

const FailurePage = () => {
  const characters =
    JSON.parse(localStorage.getItem("selectedcharacter")) || [];
  const { resetGame } = useGameContext();
  const handleReplay = () => {
    resetGame();
    window.location.href = "/";
  };
  return (
    <>
      <div className="titles">
        <h1> Défaite </h1>
      </div>
      <div className="content">
        <Description name={characters.name} />
      </div>
      <div className="replay-button">
        <Button onClick={handleReplay} text="Rejouer" />
      </div>
    </>
  );
};

export default FailurePage;
