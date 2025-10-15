export default function Description({ name, onVideoEnd }) {
  return (
    <div className="description">
      {name && (
        <video
          src={`/video/${name}.mp4`}
          autoPlay
          muted
          className="pokemon-video"
          onEnded={onVideoEnd}
        />
      )}

      {/* Texte superposé */}
      <div className="overlay-text">
        <h1>Vous avez perdu !</h1>
        <p>Retentez votre chance en choisissant un nouveau Pokémon.</p>
      </div>
    </div>
  );
}
