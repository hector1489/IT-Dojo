import { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { ENDPOINT } from '../../config/constans';
import DataContext, { DataContextProps, Product } from '../../context/context';
import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './UserPage.css'

const UserPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const { products, addToCart, favorites, addToFavorites, removeFromFavorites, } = useContext(DataContext) as DataContextProps;
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(ENDPOINT.favorite);
        console.log('Favorite Products Response:', response.data);

        setFavoriteProducts(response.data);
      } catch (error) {
        console.error('Error fetching favorite products:', error);
      }
    };

    if (user) {
      fetchFavoriteProducts();
    }
  }, [user]);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleProduct = (id: string) => {
    navigate(`/details/${id}`)
  }

  const isFavorite = (productId: string) => favorites.includes(productId);

  const handleAddToFavorites = (productId: string) => {
    addToFavorites(productId, user?.id ?? '');
  };

  const handleRemoveFromFavorites = (productId: string) => {
    removeFromFavorites(productId);
  };

  return (
    <Container>
      {user ? (
        <div className='row'>
          <div className='user-page col-md-4 mb-4 text-center p-2'>
            <h3>
              <span className='fw-bold'> Welcome </span>
              <span className='text-warning fw-bold'> : </span>
              {user?.email}
            </h3>
            <button className='css-button-gradient--7' onClick={logout}>Logout</button>
          </div>
          <div className='col-md-8 mb-4 text-center p-2'>
            <h3 className='fw-bold'>
              Favorite Articles
              <span className='text-success fw-bold'> : </span>
            </h3>
            <div className="card-container p-1">
              {favoriteProducts?.map((favoriteProduct) => {
                const product = products.find((p) => p.id === favoriteProduct.inventory_id);

                console.log('Product:', product);

                return product ? (
                  <Card key={product?.id} className="product-card">
                    <Card.Img variant="top" src={product?.url} alt={product?.name} />
                    <div className='d-flex justify-content-evenly align-items-center'>
                      <div onClick={() => handleAddToFavorites(product?.id)}>
                        <i
                          className={`fas fa-heart fa-xl ${isFavorite(product?.id) ? 'active' : ''}`}
                        />
                      </div>
                      <div onClick={() => handleRemoveFromFavorites(product?.id)}>
                        <i
                          className='fas fa-times fa-xl'
                        />
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title>{product?.name}</Card.Title>
                      <Card.Text>${product?.price}</Card.Text>
                      <Button className='css-button-gradient--4' onClick={() => handleAddToCart(product)}>
                        Adhere 🛒
                      </Button>
                      <Button
                        className='css-button-gradient--1'
                        onClick={() => handleProduct(product?.id)}
                      >
                        Details
                      </Button>
                    </Card.Body>
                  </Card>
                ) : null;
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className='d-flex flex-column justify-content-center align-items-center p-2'>
          <p>Please login to view this page.</p>
        </div>
      )}
    </Container>
  );
};

export default UserPage;
