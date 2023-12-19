import { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Navbar,  Details } from './components/index';
import { Home, LoginPage, UserPage, ProductPage, CartPage, PayingPage } from './pages/index';
import axios from 'axios';
import DataContext, { DataContextProps, CartItem } from './context/context';
import { AuthProvider } from './context/AuthContext';
import { ENDPOINT } from './config/constans'

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  url: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [shopCart, setShopCart] = useState<CartItem[]>([]);


  useEffect(() => {
    axios
      .get(ENDPOINT.products)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error al obtener data', error);
      });
  }, []);

  const addToCart = (product: Product) => {
    setShopCart(prevShopCart => {
      const existingProduct = prevShopCart.find(item => item.id === product.id);

      if (existingProduct) {
        return prevShopCart.map(item =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        return [
          ...prevShopCart,
          { id: product.id, price: product.price, name: product.name, count: 1, url: product.url }
        ];
      }
    });
  };

  const increase = (productId: number) => {
    setShopCart(prevShopCart =>
      prevShopCart.map(item =>
        item.id === productId ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const decrease = (productId: number) => {
    setShopCart(prevShopCart => {
      const updatedCart = prevShopCart.map(item =>
        item.id === productId ? { ...item, count: item.count - 1 } : item
      );

      return updatedCart.filter(item => item.count > 0);
    });
  };

  const removeFromCart = (productId: number) => {
    setShopCart(prevShopCart =>
      prevShopCart.filter(item => item.id !== productId)
    );
  };

  const formatNumber = (number: number) => {
    return number.toLocaleString();
  };

  const addToFavorites = async (productId: number, userId: string | null) => {
    try {
      await axios.post(`${ENDPOINT.favorite}`, { user_id: userId, inventory_id: productId });
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (productId: number, userId: string | null) => {
    try {
      await axios.delete(`${ENDPOINT.favorite}`, {data: { user_id: userId, inventory_id: productId } });
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const globalState: DataContextProps = {
    products,
    setProducts,
    data,
    setData,
    shopCart,
    setShopCart,
    addToCart,
    increase,
    decrease,
    removeFromCart,
    formatNumber,
    removeFromFavorites,
    addToFavorites
  };

  return (
    <AuthProvider>
    <DataContext.Provider value={globalState}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/paying" element={<PayingPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </DataContext.Provider>
    </AuthProvider>
  );
};

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
