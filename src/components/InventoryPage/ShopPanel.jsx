import { useState, useEffect } from "react";
import items from "../../data/items.json"; 

export default function ShopPanel({ onPurchase }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const initialCart = items.map(item => ({ ...item, quantity: 0 }));
    setCart(initialCart);
  }, []);

  const increment = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const buyItems = (id) => {
    const item = cart.find(i => i.id === id);
    if (item.quantity > 0) {
      if (onPurchase) onPurchase(item.id, item.quantity, item.price);

      setCart(prev =>
        prev.map(i => (i.id === id ? { ...i, quantity: 0 } : i))
      );
    }
  };

  return (
    <div className="shop-panel-content">
      <h2>Magasin</h2>
      {cart.map(item => (
        <div key={item.id} className="shop-item">
          <img src={`/img/${item.picture}`} alt={item.name} className="shop-item-img" />
          <p>{item.name}</p>
          <p>Prix : {item.price}</p>
          <div className="quantity-controls">
            <button onClick={() => decrement(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increment(item.id)}>+</button>
          </div>
          <button onClick={() => buyItems(item.id)}>Acheter</button>
        </div>
      ))}
    </div>
  );
}
