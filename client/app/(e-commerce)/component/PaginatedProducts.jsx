"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiClient } from "@/lib/apiClient";
import AddToCartButton from "@/app/(e-commerce)/component/AddToCartButton";

export default function PaginatedProducts({ initialPage = 1, limit = 4 }) {
  const [page, setPage] = useState(initialPage);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    apiClient.get(`/product/allProducts?page=${page}&limit=${limit}`)
      .then((res) => {
        const data = res?.data;
        if (!mounted) return;
        setProducts(data?.product || []);
        setPagination(data?.pagination || null);
      })
      .catch((err) => console.error(err))
      .finally(() => mounted && setLoading(false));

    return () => (mounted = false);
  }, [page, limit]);

  const goTo = (p) => setPage(p);

  return (
    <div>
      <h2 className="font-aby font-normal mt-30 text-[28px] sm:text-[36px] md:text-[42px] text-[#1A0B5B] text-center mb-6">
        All Products
      </h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div key={prod._id || prod.slug} className="group block">
                <Link href={`/product/${prod.slug}`}>
                  <div className="w-full h-auto shadow-[0px_4px_30px_0px_rgba(31,_38,_135,_0.15)] rounded-md p-3 group-hover:bg-[#2F1AC4] group-hover:text-white cursor-pointer">
                    <div className="w-full h-[200px] bg-gray-100 flex items-center justify-center rounded-md">
                      <img src={prod.thumbnail || "/placeholder.png"} alt={prod.title} className="object-contain max-h-[180px]" />
                    </div>
                    <h3 className="mt-4 text-center font-bold text-pink group-hover:text-white">{prod.title}</h3>
                    <p className="text-center mt-2 font-semibold text-[#151875] group-hover:text-white">${prod.price}</p>
                  </div>
                </Link>
                <div className="mt-2 flex justify-center">
                  <AddToCartButton product={prod} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-6">
            <button onClick={() => goTo(1)} disabled={!pagination || pagination.page === 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
              First
            </button>
            <button onClick={() => goTo(Math.max(1, page - 1))} disabled={!pagination || !pagination.hasPrevPage} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
              Prev
            </button>
            <span className="px-3 py-1">Page {pagination?.page || page} of {pagination?.totalPages || 1}</span>
            <button onClick={() => goTo(Math.min(pagination?.totalPages || 1, page + 1))} disabled={!pagination || !pagination.hasNextPage} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
              Next
            </button>
            <button onClick={() => goTo(pagination?.totalPages || page)} disabled={!pagination || pagination.page === pagination?.totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
              Last
            </button>
          </div>
        </>
      )}
    </div>
  );
}
