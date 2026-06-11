"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("cart");
        return raw ? JSON.parse(raw) : [];
      }
    } catch (e) {
      console.error("Failed to read cart from localStorage:", e);
    }
    return [];
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  }, [cart]);

  const findKey = (product) => product._id || product.id || product.slug;

  const addItem = (product, qty = 1) => {
    const key = findKey(product);
    setCart((prev) => {
      const existing = prev.find((i) => i._id === key);
      if (existing) {
        return prev.map((i) => (i._id === key ? { ...i, quantity: (i.quantity || 1) + qty } : i));
      }
      const newItem = {
        _id: key,
        title: product.title || product.name || "Untitled",
        price: Number(product.price) || 0,
        thumbnail: product.thumbnail || product.images?.[0] || "/placeholder.png",
        quantity: qty,
        slug: product.slug || "",
      };
      return [...prev, newItem];
    });
  };

  const removeItem = (id) => setCart((prev) => prev.filter((i) => i._id !== id));

  const updateQty = (id, qty) =>
    setCart((prev) => prev.map((i) => (i._id === id ? { ...i, quantity: Math.max(1, qty) } : i)));

  const clearCart = () => setCart([]);

  const totalCount = cart.reduce((s, i) => s + (i.quantity || 0), 0);
  const totalPrice = cart.reduce((s, i) => s + (i.quantity || 0) * (Number(i.price) || 0), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart, totalCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export default CartContext;
