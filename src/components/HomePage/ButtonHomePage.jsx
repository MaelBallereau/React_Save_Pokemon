import Button from "../GlobalComponents/Button";
export default function ButtonHomePage({
  selectedCharacter,
  handleStart,
  errorMessage,
}) {
  return (
    <div className="button-HomePage">
      <Button onClick={handleStart} text="Commencer" />
      <p className={`error-message ${errorMessage ? "" : "hidden"}`}>
        {errorMessage || "\u00A0"}
      </p>
    </div>
  );
}
