import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';
import UserPage from './pages/UserPage';
import DataContextProvider from './Hooks/useStore';

const App: React.FC = () => {
  return (
    <DataContextProvider>
      <div>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
      </div>
    </DataContextProvider>
  );
};

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
