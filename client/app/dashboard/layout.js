"use client"
// app/dashboard/layout.js
// import { Sidnav } from "./(admin)/components/Navbar";
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { AdminAPI } from './services/api';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      {/* <Sidnav /> Ekhon sidebar shudhu dashboard-e dekhabe */}
      <div className="flex-1 overflow-y-auto">
        {/* <ApiProvider api={AdminAPI}> */}

        {children}
        {/* </ApiProvider> */}
      </div>
    </div>
  );
}