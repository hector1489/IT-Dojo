import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import DataContext, { DataContextProps, Product } from '../../context/context';

const Details: React.FC = () => {
  const { products } = useContext(DataContext) as DataContextProps;
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const product: Product | undefined = products.find((p) => p.id === id);

  return (
    <div className="container">
      <div className="product-details">
        <h2>Product Details</h2>
        {product && (
          <div>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Stock: {product.stock}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;
