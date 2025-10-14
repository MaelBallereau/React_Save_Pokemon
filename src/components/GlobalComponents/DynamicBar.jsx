export default function DynamicBar(type, value, max) {
  return (
    <div className={`dynamic-bar ${type}`}>
      <div
        className={`dynamic-bar-fill ${type}`}
        style={{ width: `${(value / max) * 100}%` }}
      ></div>
    </div>
  );
}
