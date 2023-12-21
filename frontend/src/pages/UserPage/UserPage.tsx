import { useEffect, useContext } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { ENDPOINT } from '../../config/constans';
import DataContext, { DataContextProps, Product } from '../../context/context';
import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './UserPage.css'

const UserPage: React.FC = () => {
  const { user, logout } = useAuth();
  const { products, addToCart, addToFavorites, removeFromFavorites, favoriteProducts, setFavoriteProducts } = useContext(DataContext) as DataContextProps;
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const response = await axios.get(ENDPOINT.favorite);
        if (setFavoriteProducts) {
          setFavoriteProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    };

    fetchFavoriteProducts();
  }, [setFavoriteProducts]);


  const associatedProducts = Array.isArray(favoriteProducts)
    ? products.filter((product) =>
      favoriteProducts.some((favoriteProducts) => product?.id == favoriteProducts?.inventory_id)
    )
    : [];


  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleProduct = (id: number) => {
    navigate(`/details/${id}`);
  };

  return (
    <Container>
      {user ? (
        <div className='row'>
          <div className='user-page col-md-4 mb-4 text-center p-2'>
            <h3>
              <span className='fw-bold'> Welcome </span>
              <span className='text-warning fw-bold'> : </span>
              {user.email}
            </h3>
            <button className='css-button-gradient--7' onClick={logout}>Logout</button>
          </div>
          <div className='col-md-8 mb-4 text-center p-2'>
            <h3 className='fw-bold'>
              Favorite Articles
              <span className='text-success fw-bold'> : </span>
            </h3>
            <div className="card-container p-1">
              {associatedProducts && associatedProducts.length > 0 ? (
                associatedProducts?.map((product) => (
                  <Card key={product?.id} className="product-card">
                    <Card.Img variant="top" src={product?.url} alt={product?.name} />
                    <div className="box-icons d-flex">
                      <Button
                        className='bg-dark'
                        onClick={() => addToFavorites(product?.id ?? 0, user?.id ?? '')}
                      >
                        <i className="fas fa-heart fa-xl" />
                      </Button>
                      <Button
                        className='bg-warning'
                        onClick={() => removeFromFavorites(product?.id ?? 0, user?.id ?? '')}
                      >
                        <i className="fas fa-times fa-xl" />
                      </Button>
                    </div>
                    <Card.Body>
                      <Card.Title className="fw-bold">{product?.name}</Card.Title>
                      <Card.Text>${product?.price}</Card.Text>
                      <Card.Text>{product?.category}</Card.Text>
                      <Button
                        className="css-button-gradient--4"
                        onClick={() => product && handleAddToCart(product)}
                      >
                        Agregar 🛒
                      </Button>
                      <Button
                        className="css-button-gradient--1"
                        onClick={() => product?.id && handleProduct(product?.id)}
                      >
                        Detalles
                      </Button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No favorite products found.</p>
              )}
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
