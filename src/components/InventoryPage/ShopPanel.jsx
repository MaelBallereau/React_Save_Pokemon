const items = [
  { name: "Potion", price: 200 },
  { name: "Super Potion", price: 700 },
  { name: "Antidote", price: 100 },
];

export default function ShopPanel() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-1/4">
      <h2 className="text-xl font-bold mb-4 text-center">Boutique</h2>
      <ul>
        {items.map((item, i) => (
          <li
            key={i}
            className="flex justify-between p-2 border-b border-gray-200"
          >
            <span>{item.name}</span>
            <span>{item.price}₽</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
