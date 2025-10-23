export default function Description({ video, onVideoEnd }) {
  return (
    <div className="description">
      {video && (
        <video
          src={`/video/${video}`}
          autoPlay
          muted
          className="pokemon-video"
          onEnded={onVideoEnd}
        />
      )}

      <div className="overlay-text">
        <h1>Vous avez perdu !</h1>
        <p>Retentez votre chance en choisissant un nouveau Pokémon.</p>
      </div>
    </div>
  );
}
