import { useState, useEffect } from "react";
import items from "../../data/items.json";

export default function ShopPanel({ onPurchase }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const initialCart = items.map((item) => ({ ...item, quantity: 0 }));
    setCart(initialCart);
  }, []);

  const increment = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const buyAllItems = () => {
    const selected = cart.filter((i) => i.quantity > 0);
    if (selected.length === 0) return;

    selected.forEach((item) => {
      if (onPurchase) onPurchase({ ...item });
    });

    setCart((prev) => prev.map((i) => ({ ...i, quantity: 0 })));
  };

  return (
    <div className="shop-container">
      <h2>Magasin</h2>
      <div className="shop-items-grid">
        {cart.map((item) => (
          <div key={item.id} className="shop-card">
            <img
              src={`/img/${item.picture}`}
              alt={item.name}
              className="shop-card-img"
            />
            <p>{item.name}</p>
            <p>Prix : {item.price}</p>
            <div className="shop-quantity">
              <button onClick={() => decrement(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.id)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="shop-footer">
        <button className="shop-buy-all" onClick={buyAllItems}>
          Acheter
        </button>
      </div>
    </div>
  );
}
