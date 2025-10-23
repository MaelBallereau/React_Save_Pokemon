import Button from "../GlobalComponents/Button";

export default function ButtonHomePage({
  handleStart,
  handleReset,
  handleContinue,
  errorMessage,
}) {
  const hasQuests = localStorage.getItem("idQuest");

  return (
    <div className="button-HomePage">
      {hasQuests ? (
        <div className="button-save">
          <Button onClick={handleContinue} text="Continuer" />
          <Button onClick={handleReset} text="Réinitialiser" />
        </div>
      ) : (
        <Button onClick={handleStart} text="Commencer" />
      )}
      <p className={`error-message ${errorMessage ? "" : "hidden"}`}>
        {errorMessage || "\u00A0"}
      </p>
    </div>
  );
}
