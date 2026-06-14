import React from "react";
import Sidebar from "./(admin)/components/Sidebar";
import Navbar from "./(admin)/components/Navbar";
import DashboardCard from "./(admin)/components/DashboardCard";
import RecentOrdersTable from "./(admin)/components/RecentOrdersTable";

export default async function DashboardPage() {

  let metrics = [];
  let recentOrders = [];

  try {
    const res = await fetch("/api/dashboard/overview", {
      headers: {
        cookie: `X-AS-Token=${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load dashboard overview");
    }

    const response = await res.json();
    metrics = response?.data?.metrics || [];
    recentOrders = response?.data?.recentOrders || [];
  } catch (error) {
    console.error("Dashboard overview fetch failed:", error);
  }

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
