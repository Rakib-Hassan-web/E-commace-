"use client";

import React from "react";
import Sidebar from "../../..//dashboard/(admin)/components/Sidebar";
import Navbar from "../../../dashboard/(admin)/components/Navbar";
import { useGetUsersQuery } from "@/app/dashboard/services/api";

export default function UsersPage() {
  const { data: usersData, error, isLoading } = useGetUsersQuery();
  const users = Array.isArray(usersData) ? usersData : usersData?.users || [];

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
                    {isLoading && (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-500">Loading users...</td>
                      </tr>
                    )}

                    {error && (
                      <tr>
                        <td colSpan={6} className="px-4 py-6 text-center text-sm text-red-500">Failed to load users</td>
                      </tr>
                    )}

                    {users.map((u) => (
                      <tr key={u._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-700">{u._id}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{u.fullName || u.name || "—"}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{u.email}</td>
                        <td className="px-4 py-3 text-sm text-gray-700">{u.role}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
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
