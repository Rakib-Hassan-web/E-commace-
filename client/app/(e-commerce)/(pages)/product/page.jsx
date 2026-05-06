import React from "react";
import PaginatedProducts from "@/app/(e-commerce)/component/PaginatedProducts";

const ProductsPage = () => {
  return (
    <main className="container mx-auto py-10">
      <PaginatedProducts initialPage={1} limit={12} />
    </main>
  );
};

export default ProductsPage;
