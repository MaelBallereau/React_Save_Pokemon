import "../../public/styles/CombatPage/styles.scss";
import EntitySheet from "../components/InventoryPage/EntitySheet";
import Creatures from "../data/creatures.json";
import Combats from "../data/combats.json";
import { useState, useEffect } from "react";
import DialogueLog from "../components/CombatPage/DialogueLog";
import { attack, isDead, enemyAI } from "../engine/combat";
import { useNavigate } from "react-router-dom";

type Dialogue = {
  name: string;
  user?: string;
};

export default function CombatPage() {
  const navigate = useNavigate();
  const storedCharacter = JSON.parse(
    localStorage.getItem("selectedcharacter") || "{}"
  );
  const [character, setCharacter] = useState({ ...storedCharacter });
  const [currentEnemyIndex, setCurrentEnemyIndex] = useState(0);
  const [canFlee, setCanFlee] = useState(true);
  const [dialogues, setDialogues] = useState<Dialogue[]>([]);
  const [turn, setTurn] = useState<"player" | "enemy">("player");

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
      return Array(enemy.quantity).fill({ ...creature });
    });
  });

  useEffect(() => {
    const enemyIndex = enemies.findIndex((e) => e && !isDead(e));
    if (enemyIndex === -1) {
      
      setTimeout(() => {
        localStorage.setItem("idQuest", String(Math.min(5, idQuest + 1)));
        navigate("/quete");
      }, 3000);
    }
  }, [enemies, idQuest, navigate]);

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
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("items")) {
      localStorage.setItem(
        "items",
        JSON.stringify([
          {
            id: 1,
            name: "Potion",
            picture: "potion.png",
            target: "health",
            amount: 20,
            price: 5,
          },
          {
            id: 2,
            name: "Huile",
            picture: "huile.png",
            target: "mana",
            amount: 10,
            price: 5,
          },
          {
            id: 3,
            name: "Super Potion",
            picture: "super-potion.png",
            target: "health",
            amount: 100,
            price: 25,
          },
          {
            id: 4,
            name: "Huile max",
            picture: "huile.png",
            target: "mana",
            amount: 200,
            price: 50,
          },
        ])
      );
    }
  }, []);

  const items = JSON.parse(localStorage.getItem("items") || "[]");

  const handleObject = (object: Dialogue) => {
    setDialogues((prev) => [...prev, object]);
  };

  const playTurn = () => {
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
      return;
    }
    const enemy = enemies[enemyIndex];
    if (!enemy) return;

    const result = attack(character, enemy);

    setDialogues((prev) => [
      ...prev,
      {
        name: `${character.name} utilise ${
          result.attackName || "une attaque"
        } et inflige ${result.damage} dégâts à ${enemy.name}.`,
        user: "player",
      },
    ]);

    setEnemies((prev) => {
      const newEnemies = [...prev];
      newEnemies[enemyIndex] = { ...enemy, health: result.health };
      return newEnemies;
    });

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
        const result = enemyAI(enemy, character);

        setDialogues((prev) => [
          ...prev,
          {
            name: `${enemy.name} utilise ${
              result.attackName || "une attaque"
            } et inflige ${result.damage} dégâts à ${character.name}.`,
            user: "enemy",
          },
        ]);

        setCharacter((prev) => ({ ...prev, health: result.health }));

        if (isDead(result)) {
          setDialogues((prev) => [
            ...prev,
            {
              name: `${character.name} est vaincu...`,
              user: "enemy",
            },
          ]);
        }

        setCurrentEnemyIndex((prev) => prev + 1);
      }, 1000);
    }
  }, [turn, enemies, currentEnemyIndex]);

  return (
    <div className="combat-container">
      <div className="combat-left">
        <EntitySheet
          name={character?.name ?? ""}
          className="character"
          type="character"
          avatar={character ? `/img/${character.picture}` : ""}
          health={character?.health ?? 0}
          energy={character?.mana ?? 0}
          damage={character?.damage ?? 0}
          defense={character?.defense ?? 0}
          objects={items}
          onClick={handleObject}
        />
        <div className="section-btn-combat">
          <button
            className="btn-attack"
            onClick={playTurn}
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
                name={`${enemy.name} (${index})`}
                className="ennemies"
                type="ennemies"
                avatar={`/img/${enemy.picture}`}
                health={enemy.health}
                energy={enemy.mana}
                damage={enemy.damage}
                defense={enemy.defense}
              />
            ) : null
          )}
        </div>

        <div className="console">
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
