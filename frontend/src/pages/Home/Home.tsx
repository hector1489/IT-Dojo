import React from 'react';
import { Gallery, ProductList, Footer  } from '../../components/index'

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
