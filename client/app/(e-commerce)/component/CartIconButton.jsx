"use client";

import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCart } from "@/context/CartContext";

export default function CartIconButton({ product }) {
  const { addItem } = useCart();

  const handleClick = (e) => {
    e.preventDefault();
    addItem(product, 1);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white p-2 rounded-full shadow hover:bg-[#FB2448] hover:text-white transition duration-200"
      aria-label="Add to cart"
      title="Add to cart"
    >
      <AiOutlineShoppingCart />
    </button>
  );
}
