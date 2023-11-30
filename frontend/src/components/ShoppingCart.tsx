import React from 'react';

interface ShoppingCartProps {
  items: { id: number; name: string; price: number }[];
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ items }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShoppingCart;
