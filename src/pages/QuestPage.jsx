import "../../public/styles/QuestPage/styles.scss";
import Card from "../components/QuestPage/Card.jsx";
import BoutonInventaire from "../components/QuestPage/BoutonInventaire.jsx";
import BoutonCombat from "../components/QuestPage/BoutonCombat.jsx";
import Quest from "../../public/data/quests.json";

const QuestPage = () => {
  const quests = JSON.parse(localStorage.getItem("quests")) || Quest;
  const id = JSON.parse(localStorage.getItem("id")) || 0;
  return (
    <>
      <div className="titles">
          <h1> Quêtes </h1>
      </div>
      <div className="content-QuestPage">
          <Card title={quests[id]?.title} description={quests[id]?.description} objective={quests[id]?.objective} />
            <div className="btn">
                <BoutonInventaire />
            </div>
            <div className="btn">
                <BoutonCombat />
            </div>
      </div>  
    </>
  );
};

export default QuestPage;