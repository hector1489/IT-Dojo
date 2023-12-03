import React from 'react';
import Gallery from '../components/Carousel/Carousel';
import ProductList from '../components/productList/ProductList';

const Home: React.FC = () => {

  return (
    <div className='box-home'>
      <Gallery />
      <ProductList />
    </div>
  );
};

export default Home;
