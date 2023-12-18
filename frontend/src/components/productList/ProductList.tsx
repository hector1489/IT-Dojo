import { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import './ProductList.css';
import axios from 'axios';
import DataContext, { DataContextProps, Product } from '../../context/context';
import { useNavigate } from 'react-router-dom';
import { ENDPOINT } from '../../config/constans';
import { useAuth } from '../../context/AuthContext';

interface ProductListProps { }

const categories = ['silla', 'Lampara', 'Escritorio'];

const ProductList: React.FC<ProductListProps> = () => {
  const { products, setProducts, addToCart, addToFavorites, removeFromFavorites, favorites } =
    useContext(DataContext) as DataContextProps;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [filter, setFilter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(ENDPOINT.products, {
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching product list:', error);
      }
    };

    fetchProducts();
  }, [setProducts]);



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
    setFilter(event.target.value.toLowerCase());
  };

  const handleClearFilter = () => {
    setFilter('');
    setSelectedCategory('');
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setFilter('');
  };

  return (
    <div className="product-list-container p-2">
      <h2 className="text-center text-uppercase fw-bold p-2">Lista de productos :</h2>
      <div className="filter-container">
        <div className="categories">
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={selectedCategory === category ? 'selected' : ''}
            >
              {category}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={handleFilterChange}
        />
        <button onClick={handleClearFilter} className='.css-button-gradient'>Clear Filter</button>
      </div>
      <div className="card-container p-1">
        {products?.map((product: Product) => {
          const isCategoryMatch =
            selectedCategory === '' || product?.category.toLowerCase() === selectedCategory.toLowerCase();
          const isFilterMatch = product?.name.toLowerCase().includes(filter);
          if (isCategoryMatch && isFilterMatch) {
            return (
              <Card key={product?.id} className="product-card">
                <Card.Img variant="top" src={product?.url} alt={product?.name} />
                <div className="d-flex justify-content-evenly align-items-center">
                  <div onClick={() => handleToggleFavorite(product?.id, user)}>
                    <i
                      className={`fas fa-heart fa-xl ${isFavorite(product?.id) ? 'active' : ''}`}
                    />
                  </div>
                  <div onClick={() => handleToggleFavorite(product?.id, user)}>
                    <i className="fas fa-times fa-xl" />
                  </div>
                </div>
                <Card.Body>
                  <Card.Title className="fw-bold">{product?.name}</Card.Title>
                  <Card.Text>${product?.price}</Card.Text>
                  <Card.Text>{product?.category}</Card.Text>
                  <Button className="css-button-gradient--4" onClick={() => handleAddToCart(product)}>
                    Agregar 🛒
                  </Button>
                  <Button
                    className="css-button-gradient--1"
                    onClick={() => handleProduct(product?.id)}
                  >
                    Detalles
                  </Button>
                </Card.Body>
              </Card>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default ProductList;
