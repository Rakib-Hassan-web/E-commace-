"use client";

import React from "react";

export default function DashboardCard({ title, value, color = "bg-indigo-500" }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex flex-col items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-semibold text-gray-800">{value}</p>
      </div>
      <div className={`mt-3 p-3 rounded-md ${color} text-white`}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"></path></svg>
      </div>
    </div>
  );
}
