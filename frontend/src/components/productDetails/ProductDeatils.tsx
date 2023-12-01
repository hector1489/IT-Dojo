import React from 'react';

interface ProductDetailsProps {
  product: { id: number; name: string; price: number; description: string };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div>
      <h2>Product Details</h2>
      <p>
        <strong>Name:</strong> {product.name}
      </p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
    </div>
  );
};

export default ProductDetails;
