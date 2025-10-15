import "../../public/styles/FailurePage/styles.scss";
import Description from "../components/FailurePage/Description";
import Button from "../components/GlobalComponents/Button";
import { useState } from "react";

const FailurePage = () => {
  const characters = JSON.parse(localStorage.getItem("selectedcharacter")) || [];
  const [showReplay, setShowReplay] = useState(false);

  const handleReplay = () => {
    window.location.href = "/";
  };

  return (
    <div className="failure-page">
      <Description
        name={characters.name}
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
