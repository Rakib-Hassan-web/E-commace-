import React from "react";
import { apiClient } from "@/lib/apiClient";
import PaginatedProducts from "@/app/(e-commerce)/component/PaginatedProducts";
import AddToCartButton from "@/app/(e-commerce)/component/AddToCartButton";
import ProductImageSlider from "./ProductImageSlider";

const ProductPage = async ({ params }) => {
  const { slug } = await params;
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
    <main className="container mx-auto py-10 pt-30">
      <div className="flex flex-col md:flex-row gap-8 pt-30">
        <div className="w-full md:w-1/2">
          <ProductImageSlider
            images={[product.thumbnail, ...(product.images || [])]}
            title={product.title}
          />
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
