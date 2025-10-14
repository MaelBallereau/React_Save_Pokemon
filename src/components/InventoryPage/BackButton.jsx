export default function BackButton() {

  return (
    <button className="back-button" onClick={() => window.location.href = "/inventaire"}>
      ← Retour aux quêtes
    </button>
  );
}