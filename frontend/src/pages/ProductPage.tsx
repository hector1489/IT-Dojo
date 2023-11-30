import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../services/productServices';
import { cartService } from '../services/cartServices';

const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = productService.getProductById(Number(productId));

  if (!product) {

    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {

    cartService.addToCart({ id: product.id, name: product.name, price: product.price });
    alert('Product added to cart!');
  };

  return (
    <div>
      <h2>Product Details</h2>
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <br />
      <Link to="/products">Go back to Product List</Link>
    </div>
  );
};

export default ProductPage;
