// components/Providers.js
"use client";

import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { AdminAPI } from "@/app/dashboard/services/api";
import { CartProvider } from "@/context/CartContext";

export function Providers({ children }) {
  return (
    <ApiProvider api={AdminAPI}>
      <CartProvider>
        {children}
      </CartProvider>
    </ApiProvider>
  );
}