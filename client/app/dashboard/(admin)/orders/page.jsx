"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function OrdersPage() {

  const orders = [
    { id: "ORD-1001", customer: "Alice Johnson", date: "2026-04-20", total: "$120.00", status: "Delivered" },
    { id: "ORD-1002", customer: "Mark Peterson", date: "2026-04-21", total: "$59.99", status: "Processing" },
    { id: "ORD-1003", customer: "Lucy Smith", date: "2026-04-21", total: "$230.00", status: "Shipped" },
    { id: "ORD-1004", customer: "John Williams", date: "2026-04-22", total: "$15.00", status: "Cancelled" },
  ];

  const statusClass = (s) => {
    switch (s) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col ml-64">
          <Navbar adminName="Admin User" />

          <main className="p-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="border rounded-md px-3 py-2 text-sm w-56"
                />
                <button className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm w-auto">Export</button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-100">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{o.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{o.customer}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{o.date}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{o.total}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${statusClass(o.status)}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="text-indigo-600 hover:underline mr-3">View</button>
                          <button className="text-red-600 hover:underline">Cancel</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
