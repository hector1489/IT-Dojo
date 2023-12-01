import { HashRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import UserPage from "./pages/UserPage";

import { URLBASE, ENDPOINT } from './config/constans';

//retorno rutas
console.log(URLBASE);
console.log(ENDPOINT.login);
console.log(ENDPOINT.register);
console.log(ENDPOINT.users);
console.log(ENDPOINT.inventory);


export function App() {


  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<UserPage />} />
        <Route path="/products" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

