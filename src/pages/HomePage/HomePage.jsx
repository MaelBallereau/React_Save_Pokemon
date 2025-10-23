import "./styles.scss";
import CharacterCard from "../../components/HomePage/CharacterCard";
import characters from "../../data/characters.json";
import { useState, useEffect } from "react";
import { useGameContext } from "../../Context/GameContext";
import TitleHomePages from "../../components/HomePage/TitleHomePages";
import ButtonHomePage from "../../components/HomePage/ButtonHomePage";

export default function HomePage() {
  const { selectedCharacter, setCharacter, resetGame } = useGameContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const questid = localStorage.getItem("idQuest");
    if (questid) {
      setLocked(true);
    } else {
      setLocked(false);
    }
  }, [selectedCharacter]);

  const handleSelectCharacter = (character) => {
    setCharacter(character);
  };

  const handleStart = () => {
    if (selectedCharacter) {
      window.location.href = "/quete";
    } else {
      setErrorMessage("Vous devez sélectionner un Pokémon");
    }
  };

  const handleReset = () => {
    resetGame();
  };

  const handleContinue = () => {
    window.location.href = "/quete";
  };

  return (
    <section className="section-HomePage">
      <TitleHomePages />
      <div className={`content-HomePage ${locked ? "disabled-selected" : ""}`}>
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
        handleReset={handleReset}
        handleContinue={handleContinue}
      />
    </section>
  );
}
