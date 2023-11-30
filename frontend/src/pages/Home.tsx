import React from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productServices';

const Home: React.FC = () => {
  const products = productService.getProducts();

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
