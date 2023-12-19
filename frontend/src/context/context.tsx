import { createContext } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
  url: string;
  inventory_id?: number;
}

export interface AuthContextProps {
  user: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  count: number;
  url: string;
}

export interface Favorite {
  id: number;
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
  addToCart: (product: Product) => void;
  increase: (productId: number) => void;
  decrease: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  formatNumber: (number: number) => string;
  addToFavorites: (productId: number, userId: string | null) => void;
  removeFromFavorites: (productId: number) => void;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export default DataContext;
