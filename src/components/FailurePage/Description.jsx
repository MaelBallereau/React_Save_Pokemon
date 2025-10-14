export default function Description({ characters }) {
    return (
        <div className="description">
            <p>Vous avez perdu le combat !</p>
            <p>Retentez votre chance en choisissant un nouveau Pokémon.</p>

            {characters && (
                <video
                    src={`/videos/${characters.name.toLowerCase()}.mp4`}
                    autoPlay
                    muted
                    loop
                    className="pokemon-video"
                />
            )}
        </div>
    )
}