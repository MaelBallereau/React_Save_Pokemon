export default function CharacterCard({
  avatar,
  firstname,
  race,
  health,
  energy,
  attack,
  defense,
  money,
  spells,
}) {
  return (
    <div className="character-card">
      <div className="icon-character">
        <img src={avatar} alt="Avatar" />
      </div>
      <div className="character-info">
        <h3>{firstname}</h3>
        <p>{race}</p>
      </div>
      <div className="character-stats">
        <ul>
          <li>
            <strong>❤️ Santé :</strong> {health}
          </li>
          <li>
            <strong>⚡ Énergie :</strong> {energy}
          </li>
          <li>
            <strong>🗡️ Attaque :</strong> {attack}
          </li>
          <li>
            <strong>🛡️ Défense :</strong> {defense}
          </li>
          <li className="money">
            <img src="/img/PokeDollard.png" alt="Money" />
            <span>{money}</span>
          </li>
        </ul>
      </div>
      {spells && spells.length > 0 && (
        <div className="character-skills">
          <h3>Sorts</h3>
          <ul>
            {spells.map((spell, index) => (
              <li key={index} className="spell-item">
                <h4>{spell.name}</h4>
                <p>
                  <strong>Puissance :</strong> {spell.amount}
                </p>
                <p>
                  <strong>Coût en mana :</strong> {spell.manaCost}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
