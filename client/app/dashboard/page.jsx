import React from "react";
import Sidebar from "./(admin)/components/Sidebar";
import Navbar from "./(admin)/components/Navbar";
import DashboardCard from "./(admin)/components/DashboardCard";
import RecentOrdersTable from "./(admin)/components/RecentOrdersTable";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

export default async function DashboardPage() {
  // server-side auth check: ensure user has admin/editor role
  const token = cookies().get("X-AS-Token")?.value;
  if (!token) return redirect("/Login");

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    if (!["admin", "editor"].includes(payload.role)) {
      return redirect("/Login");
    }
  } catch (err) {
    return redirect("/Login");
  }

  const metrics = [
    { id: 1, title: "Total Orders", value: 1240, color: "bg-indigo-500" },
    { id: 2, title: "Revenue", value: "$76,540", color: "bg-green-500" },
    { id: 3, title: "Users", value: 860, color: "bg-yellow-500" },
    { id: 4, title: "Products", value: 320, color: "bg-pink-500" },
  ];

  const recentOrders = [
    { id: "ORD-1001", customer: "Alice Johnson", date: "2026-04-20", total: "$120.00", status: "Delivered" },
    { id: "ORD-1002", customer: "Mark Peterson", date: "2026-04-21", total: "$59.99", status: "Processing" },
    { id: "ORD-1003", customer: "Lucy Smith", date: "2026-04-21", total: "$230.00", status: "Shipped" },
    { id: "ORD-1004", customer: "John Williams", date: "2026-04-22", total: "$15.00", status: "Cancelled" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col ml-64">
          <Navbar adminName="Admin User" />

          <main className="p-6 max-w-7xl mx-auto w-full">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Dashboard</h1>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {metrics.map((m) => (
                <DashboardCard key={m.id} title={m.title} value={m.value} color={m.color} />
              ))}
            </div>
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-xl font-medium text-gray-700 mb-4">Recent Orders</h2>
              <RecentOrdersTable orders={recentOrders} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
