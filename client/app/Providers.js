// components/Providers.js
"use client";

import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { AdminAPI } from "@/app/dashboard/services/api";

export function Providers({ children }) {
  return (
    <ApiProvider api={AdminAPI}>
      {children}
    </ApiProvider>
  );
}