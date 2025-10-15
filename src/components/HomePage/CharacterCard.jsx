import DynamicBar from "../GlobalComponents/DynamicBar";

export default function CharacterCard({
  avatar,
  firstname,
  race,
  health,
  maxHealth,
  energy,
  maxEnergy,
  attack,
  defense,
  money,
  spells,
  onClick,
  isSelected,
}) {
  return (
    <div
      className={`character-card ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
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
          <li>
            <strong className="money">
              <img className="money-img" src="/img/money.png" /> Money :
            </strong>{" "}
            {money}
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
