import React from 'react';
import Gallery from '../components/Carousel/Carousel';
import ProductList from '../components/productList/ProductList';
import Footer from '../components/Footer/Footer';

const Home: React.FC = () => {

  return (
    <div className='box-home'>
      <Gallery />
      <ProductList />
      <Footer />
    </div>
  );
};

export default Home;
