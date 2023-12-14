import { createContext } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  url: string;
  inventory_id?: string;
}

export interface AuthContextProps {
  user: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  count: number;
  url: string;
}

export interface Favorite {
  id: string;
  user_id: string;
  inventory_id: number;
}

export interface DataContextProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  shopCart: CartItem[];
  setShopCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  favorites: string[];
  addToCart: (product: Product) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  formatNumber: (number: number) => string;
  addToFavorites: (productId: string, userId: string | null) => void;
  removeFromFavorites: (productId: string) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export default DataContext;
