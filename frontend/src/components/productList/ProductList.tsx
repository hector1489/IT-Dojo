import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductList.css';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list-container">
      <h2>Product List</h2>
      <div className="card-container">
        {products.map(product => (
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
