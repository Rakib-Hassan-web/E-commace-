"use client";

import React from "react";
import Link from "next/link";
import AddToCartButton from "@/app/(e-commerce)/component/AddToCartButton";
import { useGetProductQuery } from "@/app/dashboard/services/api";

export default function AllProducts() {
  const { data, error, isLoading } = useGetProductQuery();
  // AdminAPI transformResponse returns an array
  const products = Array.isArray(data) ? data : data?.product || [];

  return (
    <section id="all-products" className="mt-12 px-4">
      <div className="container mx-auto">
        <h2 className="font-aby text-[28px] md:text-[36px] text-[#1A0B5B] text-center mb-6">All Products</h2>

        {isLoading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-red-500 text-center">Failed to load products</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p._id || p.slug} className="group block bg-white rounded-md p-3 shadow">
              <Link href={`/product/${p.slug}`}>
                <div className="w-full h-[220px] bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
                  <img src={p.thumbnail || "/placeholder.png"} alt={p.title} className="object-contain w-full h-full" />
                </div>
              </Link>

              <h3 className="mt-3 text-center font-semibold text-[#151875]">{p.title}</h3>
              <p className="text-center text-pink font-bold mt-1">${p.price}</p>

              <div className="mt-3 flex justify-center">
                <AddToCartButton product={p} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
