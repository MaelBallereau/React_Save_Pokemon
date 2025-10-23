import "./styles.scss";
import Card from "../../components/QuestPage/Card.jsx";
import Quest from "../../data/quests.json";
import Button from "../../components/GlobalComponents/Button.jsx";
import { useGameContext } from "../../Context/GameContext.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const QuestPage = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!localStorage.getItem("idQuest")) {
      localStorage.setItem("idQuest", JSON.stringify(1));
    }
  }, []);

  let id = JSON.parse(localStorage.getItem("idQuest") ?? "1");

  const questIndex = id - 1;

  useEffect(() => {
    if (id === 5) {
      navigate("/fin");
    }
  }, [id, navigate]);

  const handleCombat = () => {
    navigate("/combat");
  };

  const handleInventaire = () => {
    navigate("/inventaire");
  };

  return (
    <>
      <div className="titles">
        <h1>Quêtes</h1>
      </div>
      <div className="content-QuestPage">
        <Card
          title={Quest[questIndex]?.title}
          description={Quest[questIndex]?.description}
          objective={Quest[questIndex]?.objective}
        />
        <div className="btn-container">
          <div className="btn">
            <Button onClick={handleInventaire} text="Inventaire" />
          </div>
          <div className="btn">
            <Button onClick={handleCombat} text="Combat" />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestPage;
