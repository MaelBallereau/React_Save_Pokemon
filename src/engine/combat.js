export function attack(attacker, defender) {
  const randomCrit = Math.round(Math.random() * (7 - 1) + 1);
  const damage = Math.max(1, attacker.damage + randomCrit - defender.defense);
  const newHealth = Math.max(0, defender.health - damage);

  return {
    health: newHealth,
    damage: damage,
    mana: attacker.mana,
    attackName: "Attaque basique",
  };
}

export function spell(attacker, defender) {
  const damage = Math.max(1, attacker.spell.amount * 1.5 - defender.defense);
  const newMana = Math.max(0, attacker.mana - attacker.spell.manaCost);
  const newHealth = Math.max(0, defender.health - damage);

  return {
    health: newHealth,
    damage: damage,
    mana: newMana,
    attackName: attacker.spell.name,
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

export function enemyAIspell(enemy, target) {
  if (enemy.spell && enemy.mana && Math.random() < 0.5) {
    return spell(enemy, target);
  } else {
    return attack(enemy, target);
  }
}
