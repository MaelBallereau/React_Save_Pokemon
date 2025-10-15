export default function Description({ name }) {
    return (
        <div className="description">
            <p>Vous avez perdu le combat !</p>
            <p>Retentez votre chance en choisissant un nouveau Pokémon.</p>

            {name && (
                <video
                    src={`/video/${name.toLowerCase()}.mp4`}
                    autoPlay
                    muted
                    loop
                    className="pokemon-video"
                />
            )}
        </div>
    )
}