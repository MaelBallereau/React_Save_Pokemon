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
    log: `${attacker.name} utilise  "une attaque" et inflige ${damage} dégâts à ${defender.name}.`,
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

export function ItemOnCharacter(character, item) {
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
  if (
    enemy.spell &&
    enemy.mana >= enemy.spell.manaCost &&
    Math.random() < 0.5
  ) {
    return spell(enemy, target);
  } else {
    return attack(enemy, target);
  }
}
