interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 19.99, description: 'Description for Product 1' },
  { id: 2, name: 'Product 2', price: 29.99, description: 'Description for Product 2' },
];

export const productService = {
  getProducts: (): Product[] => {
    return products;
  },
  getProductById: (productId: number): Product | undefined => {
    return products.find((product) => product.id === productId);
  },
};
