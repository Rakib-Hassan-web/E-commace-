"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { FiTrash2 } from "react-icons/fi";

export default function CartDropdown({ className = "" }) {
  const { cart, removeItem, updateQty, totalPrice } = useCart();

  if (!cart || cart.length === 0) {
    return (
      <div className={`w-80 bg-white shadow-lg rounded p-4 ${className}`}>
        <p className="text-center text-sm">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className={`w-96 bg-white shadow-lg rounded p-4 ${className}`}>
      <h4 className="font-semibold mb-2">Cart ({cart.length})</h4>
      <div className="max-h-64 overflow-y-auto">
        {cart.map((item) => (
          <div key={item._id} className="flex items-center gap-3 py-2 border-b last:border-b-0">
            <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <Link href={`/product/${item.slug}`}>
                <p className="font-semibold text-sm hover:underline">{item.title}</p>
              </Link>
              <p className="text-xs text-gray-600">${item.price} • Qty: {item.quantity}</p>
              <div className="mt-1 flex items-center gap-2">
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => updateQty(item._id, Math.max(1, (item.quantity || 1) - 1))}
                >
                  -
                </button>
                <span className="text-sm">{item.quantity}</span>
                <button
                  className="px-2 py-1 border rounded"
                  onClick={() => updateQty(item._id, (item.quantity || 1) + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button className="text-red-500" onClick={() => removeItem(item._id)} aria-label="Remove">
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="font-semibold">Total</div>
        <div className="font-bold">${totalPrice.toFixed(2)}</div>
      </div>

      <div className="mt-3">
        <Link href="/cart">
          <button className="w-full bg-[#FB2E86] text-white py-2 rounded">Go to Cart</button>
        </Link>
      </div>
    </div>
  );
}
