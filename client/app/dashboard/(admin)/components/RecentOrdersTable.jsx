"use client";

import React from "react";

export default function RecentOrdersTable({ orders = [] }) {
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
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-left text-sm text-gray-600">
            <th className="px-4 py-2">Order</th>
            <th className="px-4 py-2">Customer</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
