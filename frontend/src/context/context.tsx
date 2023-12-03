import { createContext } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
  }

  interface CartItem {
    id: string;
    name: string;
    price: number;
    count: number;
  }
interface DataContextProps {
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
