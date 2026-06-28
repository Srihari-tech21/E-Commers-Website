import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, []);

  const addToCart = async (productId, quantity = 1) => {
    try {
      await api.post('/cart', { productId, quantity });
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to add to cart' 
      };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      await api.put(`/cart/${itemId}`, { quantity });
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to update cart' 
      };
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await api.delete(`/cart/${itemId}`);
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to remove from cart' 
      };
    }
  };

  const clearCart = async () => {
    try {
      await api.delete('/cart');
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Failed to clear cart' 
      };
    }
  };

  const cartItemsCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const cartTotal = cart?.items?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      addToCart, 
      updateCartItem, 
      removeFromCart, 
      clearCart,
      fetchCart,
      cartItemsCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
