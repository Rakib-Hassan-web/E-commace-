import React from "react";
import Link from "next/link";
import Image from "next/image";
import { apiClient } from "@/lib/apiClient";
import PaginatedProducts from "@/app/(e-commerce)/component/PaginatedProducts";
import AddToCartButton from "@/app/(e-commerce)/component/AddToCartButton";

const ProductPage = async ({ params }) => {
  const { slug } = params;
  let product = null;

  try {
    const res = await apiClient.get(`/product/${slug}`);
    product = res?.data || null;
  } catch (error) {
    console.error("Failed to fetch product:", error);
  }

  if (!product) {
    return (
      <main className="container mx-auto py-20">
        <h2 className="text-center text-xl">Product not found</h2>
      </main>
    );
  }



  const cache = await apiClient.get("/product/allProducts",{
    revalidate: 60 * 3,
  })

  return (
    <main className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <div className="bg-gray-100 rounded-md p-4 flex items-center justify-center">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="object-contain max-h-[400px]"
            />
          </div>

          {product.images && product.images.length > 0 && (
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <div key={i} className="w-24 h-24 bg-gray-100 rounded-md flex-shrink-0">
                  <img src={img} alt={`${product.title}-${i}`} className="object-contain w-full h-full" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-semibold text-[#1A0B5B]">{product.title}</h1>
          <p className="text-lg font-bold text-pink mt-3">${product.price}</p>
          <div className="mt-4">
            <AddToCartButton product={product} />
          </div>
          <p className="text-sm text-gray-600 mt-4">{product.description}</p>

          <div className="mt-6">
            <h3 className="font-semibold">Category</h3>
            <p className="text-sm text-gray-700">{product.category?.name || "—"}</p>
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold">Variants</h3>
              <ul className="mt-2">
                {product.variants.map((v, idx) => (
                  <li key={idx} className="text-sm text-gray-700">
                    SKU: {v.sku} • Color: {v.color} • Size: {v.size?.toUpperCase()} • Stock: {v.stock}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <section className="mt-12">
        <PaginatedProducts initialPage={1} limit={4} />
      </section>
    </main>
  );
};

export default ProductPage;
