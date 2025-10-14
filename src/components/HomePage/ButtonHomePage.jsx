export default function ButtonHomePage({
  selectedCharacter,
  handleStart,
  errorMessage,
}) {
  return (
    <div className="button-HomePage">
      {selectedCharacter && (
        <p>
          {selectedCharacter
            ? `Vous avez choisi ${selectedCharacter.name}`
            : ""}
        </p>
      )}
      <button onClick={handleStart}>Commencer</button>
      <p className={`error-message ${errorMessage ? "" : "hidden"}`}>
        {errorMessage || "\u00A0"}
      </p>
    </div>
  );
}
