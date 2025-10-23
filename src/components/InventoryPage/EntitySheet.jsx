
import DynamicBar from "../GlobalComponents/DynamicBar";

export default function EntitySheet({
  type,
  avatar,
  name,
  className,
  health,
  maxHealth,
  energy,
  maxEnergy,
  damage,
  defense,
  objects = [],
  onClick = (_obj) => {},
}) {
  const safeObjects = Array.isArray(objects) ? objects : [];

  return (
    <div className={`entity-sheet ${className}`}>
      <div className="entity-avatar">
        <img src={avatar} alt={`${name} avatar`} />
      </div>

      <div className="entity-info">
        <h3>{name}</h3>
        <p className="entity-type">{type}</p>
      </div>

      <div className="entity-stats">
        <div className="stat">
          <strong>❤️ Santé :</strong>
          <DynamicBar type="health" value={health} max={maxHealth} />
          <span>{health}</span>
        </div>

        {maxEnergy ? (
          <div className="stat">
            <strong>⚡ Énergie :</strong>
            <DynamicBar type="energy" value={energy} max={maxEnergy} />
            <span>{energy}</span>
          </div>
        ) : null}

        <div className="stat">
          <strong>🗡️ Dégâts :</strong> {damage}
        </div>
        <div className="stat">
          <strong>🛡️ Défense :</strong> {defense}
        </div>
      </div>

      {safeObjects.length > 0 && (
        <div className="object">
          {safeObjects.map((obj) => (
            <div className="item" onClick={() => onClick(obj)} key={obj.id}>
              <img src={`/img/${obj.picture}`} alt={obj.name} />
              <p>{obj.name}</p>
              <div className="details">
                <span>Amount: {obj.amount}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
