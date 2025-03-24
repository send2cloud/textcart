
import { useState, useCallback } from "react";
import { MenuItem } from "../data/menuData";
import { CartItem } from "../utils/cartUtils";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  
  const addToCart = useCallback((item: MenuItem) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(cartItem => cartItem.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      } else {
        // Item doesn't exist, add to cart
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === itemId);
      
      if (existingItemIndex >= 0) {
        const item = prevItems[existingItemIndex];
        
        if (item.quantity > 1) {
          // Decrease quantity
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...item,
            quantity: item.quantity - 1
          };
          return updatedItems;
        } else {
          // Remove item if quantity is 1
          return prevItems.filter(item => item.id !== itemId);
        }
      }
      
      return prevItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getItemQuantity = useCallback((itemId: string) => {
    const item = cartItems.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  const getTotalItems = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getItemQuantity,
    getTotalItems
  };
}
