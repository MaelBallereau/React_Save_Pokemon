import "./styles.scss";
import Description from "../../components/FailurePage/Description";
import Button from "../../components/GlobalComponents/Button";
import { useState } from "react";
import { useGameContext } from "../../Context/GameContext";

const FailurePage = () => {
  const characters =
    JSON.parse(localStorage.getItem("selectedcharacter")) || [];
  const [showReplay, setShowReplay] = useState(false);

  const { resetGame } = useGameContext();
  const handleReplay = () => {
    resetGame();
    window.location.href = "/";
  };

  return (
    <div className="failure-page">
      <Description
        video={characters.video}
        onVideoEnd={() => setShowReplay(true)}
      />

      {showReplay && (
        <div className="replay-button">
          <Button onClick={handleReplay} text="Rejouer" />
        </div>
      )}
    </div>
  );
};

export default FailurePage;
