export default function ButtonHomePage({
  selectedCharacter,
  handleStart,
  errorMessage,
}) {
  return (
    <div className="button-HomePage">
      <button onClick={handleStart}>Commencer</button>
      <p className={`error-message ${errorMessage ? "" : "hidden"}`}>
        {errorMessage || "\u00A0"}
      </p>
    </div>
  );
}
