import React, { useContext, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductList.css';
import axios from 'axios';
import DataContext from '../../context/context';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const ProductList: React.FC = () => {
  const { products, setProducts, addToCart } = useContext(DataContext) as DataContextProps;

  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de productos:', error);
      });
  }, []);

  if (!products || products.length === 0) {
    return <div>No hay productos disponibles</div>;
  }

  return (
    <div className="product-list-container">
      <h2 className='text-center p-2'>Product List :</h2>
      <div className="card-container">
        {products.map((product: Product) => (
          <Card key={product.id} className="product-card">
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>${product.price}</Card.Text>
              <Button variant="success">
                Agregar 🛒
              </Button>
              <Button variant="info text-white text-decoration-none">
                Detalle
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
