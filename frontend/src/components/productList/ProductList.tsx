import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductList.css';


interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

const ProductList: React.FC= () => {
  const { products } = globalState;

  if (!products || products.length === 0) {
    return <div>No hay productos disponibles</div>;
  }

  return (
    <div className="product-list-container">
      <h2>Product List</h2>
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
