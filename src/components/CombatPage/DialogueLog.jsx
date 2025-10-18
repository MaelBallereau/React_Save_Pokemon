export default function CombatLog({ data }) {
  const isPlayer = data.user === "player";
  const isEnemy = data.user === "enemy";

  let message = "";
  if (isPlayer) {
    message = `${data.name}`;
  } else if (isEnemy) {
    message = data.name;
  }

  const arrow = isEnemy ? "< " : "> ";

  return (
    <p
      className={`dialogue-line ${
        isPlayer ? "dialogue-left" : "dialogue-right"
      }`}
    >
      {arrow}
      {message}
    </p>
  );
}
