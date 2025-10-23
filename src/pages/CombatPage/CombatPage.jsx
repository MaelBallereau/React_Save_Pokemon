import "./styles.scss";
import EntitySheet from "../../components/InventoryPage/EntitySheet";
import Creatures from "../../data/creatures.json";
import Combats from "../../data/combats.json";
import { useState, useEffect, useRef, useCallback } from "react";
import DialogueLog from "../../components/CombatPage/DialogueLog";
import {
  attack,
  isDead,
  spell,
  ItemOnCharacter,
  enemyAIspell,
} from "../../engine/combat";
import { useNavigate } from "react-router-dom";

export default function CombatPage() {
  const navigate = useNavigate();
  const consoleRef = useRef(null);

  const storedCharacter = JSON.parse(localStorage.getItem("selectedcharacter"));

  const [character, setCharacter] = useState({
    ...storedCharacter,
    maxHealth: storedCharacter.healthMax,
    maxMana: storedCharacter.manaMax,
  });
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [canFlee, setCanFlee] = useState(true);
  const [dialogues, setDialogues] = useState([]);
  const [turn, setTurn] = useState("player");

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [dialogues]);

  useEffect(() => {
    if (character && character.name) {
      localStorage.setItem("selectedcharacter", JSON.stringify(character));
    }
  }, [character]);

  const win = useCallback(() => {
    setTurn(null);
    const newQuest = Number(localStorage.getItem("idQuest") || 0) + 1;
    localStorage.setItem("idQuest", newQuest);
    setTimeout(() => navigate("/victoire"), 2000);
  }, [navigate]);

  const loose = useCallback(() => {
    setTurn(null);
    setTimeout(() => navigate("/echec"), 2000);
  }, [navigate]);

  const idQuest = JSON.parse(localStorage.getItem("idQuest") || "0");
  const combatData = Combats.find((combat) => combat.questId === idQuest);

  const [enemies, setEnemies] = useState(() => {
    if (!combatData?.enemies) {
      console.error("Aucun ennemi trouvé dans combatData");
      return [];
    }

    return combatData.enemies.flatMap((enemy) => {
      const creature = Creatures.find((c) => c.name === enemy.name);
      if (!creature) {
        console.warn(`Créature non trouvée pour : ${enemy.name}`);
        return [];
      }
      return Array(enemy.quantity).fill({
        ...creature,
        maxHealth: creature.health,
        maxMana: creature.mana,
      });
    });
  });

  useEffect(() => {
    const enemyIndex = enemies.findIndex((e) => e && !isDead(e));
    if (enemyIndex === -1) {
      win();
    }
  }, [enemies, navigate, win]);

  const handleFlee = () => {
    if (!canFlee) return;

    const fleeSuccess = Math.random() < 0.5;
    console.log(fleeSuccess);
    if (fleeSuccess) {
      setDialogues((prev) => [
        ...prev,
        {
          name: `${character.name} a fui le combat !`,
          user: "player",
        },
      ]);
      setTimeout(() => navigate("/quete"), 1500);
    } else {
      setDialogues((prev) => [
        ...prev,
        {
          name: `${character.name} ne peut pas fuir...`,
          user: "player",
        },
      ]);
      setCanFlee(false);
      setTurn("enemy");
    }
  };

  const inventory = JSON.parse(localStorage.getItem("inventory") || "[]");

  const handleObject = (item) => {
    if (turn !== "player") return;

    const updatedCharacter = ItemOnCharacter(character, item);
    setCharacter(updatedCharacter);

    setDialogues((prev) => [
      ...prev,
      {
        name: `${character.name} utilise ${item.name} et récupère ${
          item.amount
        } ${item.target === "health" ? "points de vie" : "points de mana"} !`,
        user: "player",
      },
    ]);

    setTurn("enemy");
  };

  const playTurn = (type) => {
    if (turn !== "player") return;
    const enemyIndex = enemies.findIndex((e) => e && !isDead(e));
    if (enemyIndex === -1) {
      setDialogues((prev) => [
        ...prev,
        {
          name: "Tous les ennemis sont vaincus !",
          user: "enemy",
        },
      ]);
    }

    const enemy = enemies[enemyIndex];
    if (!enemy) return;

    let result = attack(character, enemy);
    if (type === "spell") {
      if (character.mana < character.spell.manaCost) {
        setDialogues((prev) => [
          ...prev,
          {
            name: `${character.name} n'a pas assez de mana pour lancer ${character.spell.name} !`,
            user: "player",
          },
        ]);
        setTurn("enemy");
        return;
      }

      result = spell(character, enemy);

      setCharacter((prev) => ({
        ...prev,
        mana: result.mana,
      }));
    }
    if (type === "potion" && inventory) {
      const updatedCharacter = ItemOnCharacter(character, inventory);
      setCharacter(updatedCharacter);

      setDialogues((prev) => [
        ...prev,
        {
          name: `${character.name} utilise ${inventory.name} et récupère ${
            inventory.amount
          } ${inventory.target === "health" ? "points de vie" : "mana"} !`,
          user: "player",
        },
      ]);

      setTurn("enemy");
      return;
    }
    setDialogues((prev) => [
      ...prev,
      {
        name: `${character.name} utilise ${
          result.attackName || "une attaque"
        } et inflige ${result.damage} dégâts à ${enemy.name}.`,
        user: "player",
      },
    ]);

    setEnemies((prevEnemies) =>
      prevEnemies.map((e, i) =>
        i === enemyIndex
          ? {
              ...e,
              health: Math.max(0, e.health - result.damage),
            }
          : e
      )
    );

    if (isDead(result)) {
      setDialogues((prev) => [
        ...prev,
        {
          name: `${enemy.name} est vaincu !`,
          user: "enemy",
        },
      ]);
    }
    setCurrentEnemyIndex(0);
    setTurn("enemy");
  };

  useEffect(() => {
    if (turn === "enemy") {
      const livingEnemies = enemies.filter((e) => !isDead(e));
      if (livingEnemies.length === 0) {
        setTurn("player");
        return;
      }

      if (currentEnemyIndex >= livingEnemies.length) {
        setCurrentEnemyIndex(0);
        setTurn("player");
        return;
      }

      const enemy = livingEnemies[currentEnemyIndex];
      if (!enemy) return;

      setTimeout(() => {
        const result = enemyAIspell(enemy, character);

        setDialogues((prev) => [
          ...prev,
          {
            name: `${enemy.name} utilise ${result.attackName}
              et inflige ${result.damage} dégâts à ${character.name}.`,
            user: "enemy",
          },
        ]);

        setCharacter((prev) => ({
          ...prev,
          health: Math.max(0, prev.health - result.damage),
        }));

        setEnemies((prevEnemies) =>
          prevEnemies.map((e) =>
            e.name === enemy.name ? { ...e, mana: result.mana } : e
          )
        );

        if (isDead(result)) {
          setDialogues((prev) => [
            ...prev,
            {
              name: `${character.name} est vaincu...`,
              user: "enemy",
            },
          ]);
          loose();
        }

        setCurrentEnemyIndex((prev) => prev + 1);
      }, 1000);
    }
  }, [turn, enemies, currentEnemyIndex, character, loose]);

  return (
    <div className="combat-container">
      <div className="combat-left">
        <EntitySheet
          name={character?.name ?? ""}
          className="character"
          type={character?.class ?? ""}
          avatar={character ? `/img/${character.picture}` : ""}
          health={character?.health ?? 0}
          maxHealth={character?.maxHealth ?? 0}
          energy={character?.mana ?? 0}
          maxEnergy={character?.maxMana ?? 0}
          damage={character?.damage ?? 0}
          defense={character?.defense ?? 0}
          objects={inventory}
          onClick={handleObject}
        />
        <div className="section-btn-combat">
          <button
            className="btn-attack-spell"
            onClick={() => playTurn("spell")}
            disabled={turn !== "player"}
          >
            {character.spell ? character.spell.name : "Attaquer"}
          </button>
          <button
            className="btn-attack"
            onClick={() => playTurn("attack")}
            disabled={turn !== "player"}
          >
            Attaquer
          </button>
          <button
            onClick={handleFlee}
            className="btn-flee"
            disabled={!canFlee || turn !== "player"}
          >
            Fuir
          </button>
        </div>
      </div>

      <div className="combat-right">
        <div className="combat-ennemies">
          {enemies.map((enemy, index) =>
            enemy ? (
              <EntitySheet
                key={`${enemy.name}-${index}`}
                name={`${enemy.name} `}
                className="ennemies"
                avatar={`/img/${enemy.picture}`}
                health={enemy.health}
                maxHealth={enemy.maxHealth}
                energy={enemy.mana}
                maxEnergy={enemy.maxMana}
                damage={enemy.damage}
                defense={enemy.defense}
              />
            ) : null
          )}
        </div>

        <div className="console" ref={consoleRef}>
          {dialogues.map((data, index) => (
            <div className="dialogue-box" key={index}>
              <DialogueLog data={data} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}