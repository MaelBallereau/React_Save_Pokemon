export default function CharacterCard({avatar,firstname,lastname,race,health,energy,attack,defense,money}) {
    return (
        <div className="character-card">
            <div className="icon-character">
                <img src={avatar} alt="Avatar" />
            </div>
            <div className="character-info">
                <h3>{firstname}</h3>
                <h4>{lastname}</h4>
                <p>{race}</p>
            </div>
            <div className="character-stats">
                <ul>
                    <li>{health}</li>
                    <li>{energy}</li>
                    <li>{attack}</li>
                    <li>{defense}</li>
                    <li>
                        <img src="/public/img/PokeDollard.png" alt="Money" />
                        {money}
                    </li>
                </ul>
            </div>
        </div>
    )
}