import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  stock: number;
  quantity?:number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  cartTotal: number;
  updateProductStock: (productId: number, newStock: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const removedItem = prevCart.find(item => item.id === productId);
      if (removedItem) {
        updateProductStock(productId, getProductStock(productId) + removedItem.quantity);
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id === productId) {
          const stockDifference = item.quantity - quantity;
          updateProductStock(productId, getProductStock(productId) + stockDifference);
          return { ...item, quantity: Math.max(0, quantity) };
        }
        return item;
      });
      return updatedCart.filter(item => item.quantity > 0);
    });
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const getProductStock = (productId: number): number => {
    const storedStock = localStorage.getItem(`product_${productId}_stock`);
    return storedStock !== null ? parseInt(storedStock, 10) : 0;
  };

  const updateProductStock = (productId: number, newStock: number) => {
    localStorage.setItem(`product_${productId}_stock`, newStock.toString());
  };
  const clearCart = () => {
    cart.forEach(item => {
      const currentStock = getProductStock(item.id);
      updateProductStock(item.id, currentStock + item.quantity);
    });

    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity, cartTotal, updateProductStock,clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
