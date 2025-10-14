export default function Card({ title, description, objective }) {
    return (
        <div className="Card">
            <h2>{title}</h2>
            <p>{description}</p>
            <h3>{objective}</h3>
        </div>
    )
}