"use client";

import React from "react";
import Sidebar from "../../..//dashboard/(admin)/components/Sidebar";
import Navbar from "../../../dashboard/(admin)/components/Navbar";

export default function UsersPage() {

  const users = [
    { id: "USR-1001", name: "Alice Johnson", email: "alice@example.com", role: "Customer", joined: "2025-11-05" },
    { id: "USR-1002", name: "Mark Peterson", email: "mark@example.com", role: "Customer", joined: "2026-01-12" },
    { id: "USR-1003", name: "Lucy Smith", email: "lucy@example.com", role: "Seller", joined: "2024-09-30" },
    { id: "USR-1004", name: "John Williams", email: "john@example.com", role: "Admin", joined: "2023-07-18" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1 flex flex-col ml-64">
          <Navbar adminName="Admin User" />

          <main className="p-6 max-w-7xl mx-auto w-full">
            <div className="flex items-center justify-between mb-4 gap-3">
              <h1 className="text-2xl font-semibold text-gray-800">Users</h1>

              <div className="flex items-center gap-3">
                <input type="text" placeholder="Search users..." className="border rounded-md px-3 py-2 text-sm w-56" />
                <button className="bg-indigo-600 text-white px-3 py-2 rounded-md text-sm w-auto">Invite User</button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-100">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{u.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{u.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{u.role}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{u.joined}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button className="text-indigo-600 hover:underline mr-3">Edit</button>
                          <button className="text-red-600 hover:underline">Remove</button>
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
