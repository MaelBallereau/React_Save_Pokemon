import Button from "../GlobalComponents/Button";

export default function ButtonHomePage({
  handleStart,
  handleReset,
  handleContinue,
  errorMessage,
}) {
  const hasQuests = !!localStorage.getItem("quests"); 
  return (
    <div className="button-HomePage">
      {hasQuests ? (
        <>
          <Button onClick={handleReset} text="Réinitialiser" />
          <Button onClick={handleContinue} text="Continuer" />
        </>
      ) : (
        <Button onClick={handleStart} text="Commencer" />
      )}
      <p className={`error-message ${errorMessage ? "" : "hidden"}`}>
        {errorMessage || "\u00A0"}
      </p>
    </div>
  );
}
