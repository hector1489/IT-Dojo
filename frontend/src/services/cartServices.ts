interface CartItem {
  id: number;
  name: string;
  price: number;
}

let cartItems: CartItem[] = [];

export const cartService = {
  getCartItems: (): CartItem[] => {
    return cartItems;
  },
  addToCart: (product: CartItem): void => {
    cartItems.push(product);
  },
  clearCart: (): void => {
    cartItems = [];
  },
};
