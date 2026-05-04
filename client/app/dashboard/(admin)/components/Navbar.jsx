"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar({ adminName = "Admin", onToggleSidebar }) {
  const router = useRouter();

const handleLogout = () => {
  document.cookie.split(";").forEach((c) => {
    document.cookie =
      c.trim().split("=")[0] +
      "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
  });

  router.push("/");
};
  return (
    <header className="bg-white border-b">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-3">
          {typeof onToggleSidebar === "function" && (
            <button onClick={onToggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          )}

          <div className="text-lg font-semibold">Admin Dashboard</div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-gray-700">{adminName}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
