// const salamèche = {
//   id: 2,
//   name: "Salamèche",
//   class: "Lézard",
//   picture: "salamèche.png",
//   health: 390,
//   healthMax: 390,
//   mana: 200,
//   manaMax: 200,
//   damage: 50,
//   defense: 50,
//   fortune: 200,
//   spell: {
//     name: "Flammèche",
//     target: "enemy",
//     effect: "damage",
//     amount: 40,
//     manaCost: 25,
//   },
// };
// const ennemies = {
//   name: "Rattata",
//   picture: "rattata.png",
//   health: 300,
//   mana: 0,
//   damage: 60,
//   defense: 35,
// };

// enemyAI(ennemies, salamèche);
// console.log(enemyAI(ennemies, salamèche));

export function attack(attacker, defender) {
  const randomCrit = Math.round(Math.random() * (7 - 1) + 1);
  console.log(randomCrit);
  const damage = Math.max(1, attacker.damage + randomCrit - defender.defense);
  console.log("attacker damage", attacker.damage);
  console.log("defender defense", defender.defense);
  console.log("damage", damage);
  const newHealth = Math.max(0, defender.health - damage);
  console.log("newHealth", newHealth);

  return {
    health: newHealth,
    damage: damage,
    attackName: "Attaque basique",
    log: `${attacker.name} utilise  "une attaque"
    } et inflige ${damage} dégâts à ${defender.name}.`,
  };
}

export function spell(attacker, defender) {
  const randomCrit = Math.round(Math.random() * (7 - 1) + 1);
  const damage = Math.max(
    1,
    attacker.spell.amount + randomCrit - defender.defense
  );
  const newMana = Math.max(0, attacker.mana - attacker.spell.manaCost);
  const newHealth = Math.max(0, defender.health - damage);

  return {
    health: newHealth,
    damage: damage,
    mana: newMana,
    attackName: attacker.spell.name,
    log: `${attacker.name} utilise ${attacker.spell.name} et inflige ${damage} dégâts à ${defender.name}.`,
  };
}

export function isDead(entity) {
  return entity.health <= 0;
}

export function useItemOnCharacter(character, item) {
  if (item.target === "health") {
    const healed = Math.min(
      character.maxHealth,
      character.health + item.amount
    );
    return { ...character, health: healed };
  }
  if (item.target === "mana") {
    const refilled = Math.min(character.maxMana, character.mana + item.amount);
    return { ...character, mana: refilled };
  }
  return character;
}

export function enemyAI(enemy, target) {
  return attack(enemy, target);
}
export function enemyAIspell(enemy, target) {
  if (enemy.spell && enemy.mana >= enemy.spell.manaCost) {
    return spell(enemy, target);
  } else {
    return attack(enemy, target);
  }
}
