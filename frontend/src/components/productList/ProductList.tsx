import React, { useContext, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductList.css';
import axios from 'axios';
import DataContext, { DataContextProps } from '../../context/context';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  url: string;
}

const ProductList: React.FC = () => {
  const { products, setProducts, addToCart } = useContext(DataContext) as DataContextProps;
  const navigate = useNavigate()

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

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleProduct = (id: string) => {
    navigate(`/details/${id}`)
  }

  return (
    <div className="product-list-container p-2">
      <h2 className='text-center text-uppercase fw-bold p-2'>Product List :</h2>
      <div className="card-container p-1">
        {products?.map((product: Product) => (
          <Card key={product?.id} className="product-card">
            <Card.Img variant="top" src={product?.url} alt={product?.name} />
            <Card.Body>
              <Card.Title>{product?.name}</Card.Title>
              <Card.Text>${product?.price}</Card.Text>
              <Button className='css-button-gradient--4' onClick={() => handleAddToCart(product)}>
                Adhere 🛒
              </Button>
              <Button
              className='css-button-gradient--1 '
              onClick={() => handleProduct(product?.id)}
              >
                Details
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
