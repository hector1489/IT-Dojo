import { createContext } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
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
}
export interface DataContextProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  shopCart: CartItem[];
  setShopCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (product: Product) => void;
  increase: (productId: string) => void;
  decrease: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  formatNumber: (number: number) => string;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export default DataContext;
