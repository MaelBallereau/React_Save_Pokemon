export default function Card({ title, description, objectif }) {
    return (
        <div className="Card">
            <h1>{title}</h1>
            <p>{description}</p>
            <h2>{objectif}</h2>
        </div>
    )
}