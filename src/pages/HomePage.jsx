import "../../public/styles/HomePage/styles.scss";
import CharacterCard from "../components/HomePage/CharacterCard";

const HomePage = () => {
  return (
    <>
      <div className="title">
        <img
          className="title-img"
          src="public/img/title_pokemon.png"
          alt="Pokemon title"
        />
        <h2 className="title-text">Choisir votre Pokemon</h2>
      </div>
      <div className="content">
        <CharacterCard avatar="/public/img/bravhilde-briseflamme.png" firstname="Bravhilde" lastname="Briseflamme" race="Guerrière Humaine" health="180" energy="0" attack="18" defense="30" money="0" />
      </div>
    </>
  );
};

export default HomePage;
