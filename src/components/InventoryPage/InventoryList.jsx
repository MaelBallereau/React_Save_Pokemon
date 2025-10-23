export default function InventoryList({ items }) {
  return (
    <div className="inventory-card">
      <h2>Inventaire</h2>
      <div className="inventory-content">
        {items.length === 0 ? (
          <p className="empty">Aucun objet acheté... (espèce de ratata)</p>
        ) : (
          <ul className="inventory-list">
            {items.map((item) => (
              <li key={item.id} className="inventory-item">
                <img
                  src={`/img/${item.picture}`}
                  alt={item.name}
                  className="inventory-item-img"
                />
                <span className="item-name">{item.name}</span>
                <span className="item-qty">× {item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
