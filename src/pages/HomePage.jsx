import "../../public/styles/HomePage/styles.scss";
import CharacterCard from "../components/HomePage/CharacterCard";
import characters from "../../public/data/characters.json";
import { useState, useEffect } from "react";
import TitleHomePages from "../components/HomePage/TitleHomePages";
import ButtonHomePage from "../components/HomePage/ButtonHomePage";
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
    localStorage.setItem("selectedcharacter", JSON.stringify(character));
  };

  const handleStart = () => {
    if (selectedCharacter) {
      window.location.href = "/quete";
    } else {
      setErrorMessage("Vous devez selectionnée un Pokémon");
    }
  };

  return (
    <section className="section-HomePage">
      <TitleHomePages />
      <div className="content-HomePage">
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
      <ButtonHomePage
        errorMessage={errorMessage}
        selectedCharacter={selectedCharacter}
        handleStart={handleStart}
      />
    </section>
  );
};

export default HomePage;
