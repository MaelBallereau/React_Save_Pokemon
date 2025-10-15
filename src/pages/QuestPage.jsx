import "../../public/styles/QuestPage/styles.scss";
import Card from "../components/QuestPage/Card.jsx";
import Quest from "../../public/data/quests.json";
import Button from "../components/GlobalComponents/Button.jsx";

const QuestPage = () => {
  const quests = JSON.parse(localStorage.getItem("quests")) || Quest;
  const id = JSON.parse(localStorage.getItem("id")) || 0;
  const selectedcharacter = JSON.parse(localStorage.getItem("selectedcharacter"));
  const handleCombat = () => {
    window.location.href = "/combat";
  };
  const handleInventaire = () => {
    window.location.href = "/inventaire";
  };
  return (
    <>
      <div className="titles">
        <h1> Quêtes </h1>
      </div>
      <div className="content-QuestPage">
        <Card
          title={quests[id]?.title}
          description={quests[id]?.description}
          objective={quests[id]?.objective}
        />
        <div className="btn">
          <Button onClick={handleInventaire} text="Inventaire" />
        </div>
        <div className="btn">
          <Button onClick={handleCombat} text="Combat" />
        </div>
      </div>
    </>
  );
};

export default QuestPage;
