import "../../public/styles/FailurePage/styles.scss";
import Description from "../components/FailurePage/Description";
import Button from "../components/GlobalComponents/Button";

const FailurePage = () => {
  const characters = JSON.parse(localStorage.getItem("characters")) || [];
  const handleReplay = () => {
    window.location.href = "/";
  };
  return (
    <>
      <div className="titles">
        <h1> Défaite </h1>
      </div>
      <div className="content">
        <Description characters={characters} />
      </div>
      <div className="replay-button">
        <Button onClick={handleReplay} text="Rejouer" />
      </div>
    </>
  );
};

export default FailurePage;
