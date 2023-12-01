import React from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productServices';
import Gallery from '../components/Carousel/Carousel';

const Home: React.FC = () => {
  const products = productService.getProducts();

  return (
    <div className='box-home'>
      <Gallery />
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
    </div>
  );
};

export default Home;
