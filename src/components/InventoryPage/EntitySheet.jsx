import DynamicBar from "../GlobalComponents/DynamicBar";

export default function EntitySheet() {
  return (
    <div className="entity-sheet">
      <DynamicBar type="energy" value={energy} max={maxEnergy} />
    </div>
  );
}
