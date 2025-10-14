import "../../public/styles/FailurePage/styles.scss";
import Description from "../components/FailurePage/Description";
import BoutonRejouer from "../components/FailurePage/BoutonRejouer";

const FailurePage = () => {
  const characters = JSON.parse(localStorage.getItem("characters")) || [];
  return (
    <>
      <div className="titles">
          <h1> Défaite </h1>
      </div>
      <div className="content">
          <Description characters={characters} />
      </div>
      <div className="replay-button">
          <BoutonRejouer />
      </div>
    </>
  );
};

export default FailurePage;