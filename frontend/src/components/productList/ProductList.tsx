import { useContext, useEffect,useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductList.css';
import axios from 'axios';
import DataContext, { DataContextProps } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../../config/constans'
import { useAuth } from '../../context/AuthContext';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  url: string;
}


const ProductList: React.FC = () => {
  const { products, setProducts, addToCart, addToFavorites, removeFromFavorites, favorites } = useContext(
    DataContext
  ) as DataContextProps;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(ENDPOINT.products, { params: { category: filter } });
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    };

    fetchProducts();
  }, [filter, setProducts]);

  if (!products || products.length === 0) {
    return <div>No hay productos disponibles</div>;
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleProduct = (id: string) => {
    navigate(`/details/${id}`);
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const handleToggleFavorite = (productId: string, user: { id: string } | null) => {
    if (user && user.id) {
      const userId = user.id;
      if (isFavorite(productId)) {
        removeFromFavorites(productId);
      } else {
        addToFavorites(productId, userId);
      }
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };


  return (
    <div className="product-list-container p-2">
      <h2 className='text-center text-uppercase fw-bold p-2'>Product List :</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
      <div className="card-container p-1">
        {products?.map((product: Product) => (
          <Card key={product?.id} className="product-card">
            <Card.Img variant="top" src={product?.url} alt={product?.name} />
            <div className='d-flex justify-content-evenly align-items-center'>
              <div onClick={() => handleToggleFavorite(product?.id, user)}>
                <i
                  className={`fas fa-heart fa-xl ${isFavorite(product?.id) ? 'active' : ''}`}
                />
              </div>
              <div onClick={() => handleToggleFavorite(product?.id, user)}>
                <i
                  className='fas fa-times fa-xl'
                />
              </div>
            </div>
            <Card.Body>
              <Card.Title className='fw-bold'>{product?.name}</Card.Title>
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