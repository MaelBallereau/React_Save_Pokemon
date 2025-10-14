import "../../public/styles/HomePage/styles.scss";
import CharacterCard from "../components/HomePage/CharacterCard";
import characters from "../../public/data/characters.json";
import { useState, useEffect } from "react";
const HomePage = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (selectedCharacter !== null) {
      setErrorMessage(null);
    }
  }, [selectedCharacter]);

  const handleSelectCharacter = (character) => {
    setSelectedCharacter(character);
  };

  const handleStart = () => {
    if (selectedCharacter) {
      window.location.href = "/quetes";
    } else {
      setErrorMessage("Vous devez selectionnée un Pokemon");
    }
  };

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
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            avatar={`/img/${character.picture}`}
            firstname={character.name}
            race={character.class}
            health={character.health}
            energy={character.mana}
            attack={character.damage}
            defense={character.defense}
            money={character.fortune}
            spells={character.spell ? [character.spell] : []}
            isSelected={selectedCharacter?.id === character.id}
            onClick={() => handleSelectCharacter(character)}
          />
        ))}
      </div>
      <div className="button-HomePage">
        {selectedCharacter && (
          <p>
            {selectedCharacter
              ? `Vous avez choisi ${selectedCharacter.name}`
              : ""}
          </p>
        )}
        <button onClick={handleStart}>Commencer</button>
        <p className={`error-message ${errorMessage ? "" : "hidden"}`}>
          {errorMessage || "\u00A0"}
        </p>
      </div>
    </>
  );
};

export default HomePage;
