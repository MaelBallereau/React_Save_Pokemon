import "../../public/styles/HomePage/styles.scss";
import CharacterCard from "../components/HomePage/CharacterCard";
import characters from "../../public/data/characters.json";
const HomePage = () => {
  return (
    <>
      <div className="title-HomePage">
        <img
          className="title-img"
          src="public/img/title_pokemon.png"
          alt="Pokemon title"
        />
        <h2 className="title-text">Choisir votre Pokemon</h2>
      </div>
      <div className="content">
        {characters.map(
          (character) => (
            (
              <CharacterCard
                key={character.id}
                avatar={character.picture}
                firstname={character.name}
                race={character.class}
                health={character.health}
                energy={character.mana}
                attack={character.damage}
                defense={character.defense}
                money={character.fortune}
                spells={character.spell ? [character.spell] : []}
              />
            )
          )
        )}
      </div>
    </>
  );
};

export default HomePage;
