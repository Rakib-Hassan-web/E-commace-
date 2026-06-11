"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Button from "@/utils/Button";

export default function AddToCartButton({ product }) {
  const { addItem } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAdd = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setAdding(true);
    addItem(product, 1);
    setTimeout(() => setAdding(false), 700);
  };

  return (
    <Button onClick={handleAdd} className="px-4 py-2">
      {adding ? "Added" : "Add to Cart"}
    </Button>
  );
}
