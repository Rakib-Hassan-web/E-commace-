"use client";

import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed z-30 inset-y-0 left-0 w-64 bg-white border-r shadow-lg">
      <div className="h-16 flex items-center px-6 border-b">
        <span className="text-lg font-bold">Admin Panel</span>
      </div>

      <nav className="p-6">
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18M3 6h18M3 18h18"></path></svg>
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/orders" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v4H3zM3 7h18v11a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"></path></svg>
              <span>Orders</span>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/products" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15V7a2 2 0 00-2-2h-6"></path></svg>
              <span>Products</span>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/categories" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8M4 18h16"></path></svg>
              <span>Categories</span>
            </Link>
          </li>

          <li>
            <Link href="/dashboard/users" className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11a4 4 0 10-8 0M12 14c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5z"></path></svg>
              <span>Users</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
