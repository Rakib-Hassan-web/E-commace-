"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import Button from "@/utils/Button";
import Input from "@/utils/Input";
import Image from "next/image";
import toast from "react-hot-toast";
import { useGetSingleProductQuery, useUpdateProductMutation, useDeleteProductMutation, useGetCategoriesQuery } from "../../../services/api";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const { data: product, isLoading } = useGetSingleProductQuery(slug, { skip: !slug });
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: deleting }] = useDeleteProductMutation();
  const { data: categories = [] } = useGetCategoriesQuery();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    tags: [],
    category: "",
    thumbnail: null,
    isActive: true,
  });

  useEffect(() => {
    if (product) {
      setForm((f) => ({
        ...f,
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        discountPercentage: product.discountPercentage || "",
        tags: product.tags || [],
        category: product.category?._id || product.category || "",
        isActive: product.isActive !== false,
      }));
    }
  }, [product]);

  const handleFile = (e) => {
    setForm((p) => ({ ...p, thumbnail: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!slug) return;

    try {
      let body;
      // if thumbnail present send FormData, otherwise JSON
      if (form.thumbnail) {
        const fd = new FormData();
        fd.append("title", form.title);
        fd.append("description", form.description);
        fd.append("price", form.price);
        fd.append("discountPercentage", form.discountPercentage);
        fd.append("category", form.category);
        fd.append("isActive", form.isActive ? "true" : "false");
        // send tags as repeated fields
        (form.tags || []).forEach((t) => fd.append("tags", t));
        fd.append("thumbnail", form.thumbnail);
        body = fd;
      } else {
        body = {
          title: form.title,
          description: form.description,
          price: form.price,
          discountPercentage: form.discountPercentage,
          category: form.category,
          tags: form.tags,
          isActive: form.isActive ? "true" : "false",
        };
      }

      await updateProduct({ slug, body }).unwrap();
      toast.success("Product updated");
      setIsEditing(false);
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(slug).unwrap();
      toast.success("Product deleted");
      router.push("/dashboard/products");
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-slate-100 font-[Inter]">
      <div className="w-64 fixed left-0 top-0 h-full bg-white border-r">
        <Sidebar />
      </div>

      <div className="flex-1 ml-64 p-6">
        <div className="max-w-3xl bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Product Details</h2>
            <div className="flex gap-2">
              <Button onClick={() => setIsEditing((s) => !s)}>
                {isEditing ? "Cancel" : "Edit"}
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {product?.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.thumbnail} alt="thumbnail" className="w-full rounded" />
                ) : (
                  <div className="w-full h-48 bg-slate-100 rounded flex items-center justify-center">No Image</div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-sm text-slate-600 my-2">{product.description}</p>
                <p className="font-semibold mt-2">Price: ৳ {product.price}</p>
                <p className="mt-1">Category: {product.category?.name || product.category}</p>
                <p className="mt-1">Tags: {(product.tags || []).join(", ")}</p>
                <p className="mt-1">Stock: {(product.variants || []).reduce((a, v) => a + Number(v.stock || 0), 0)}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <Input value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} label="Title" />

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Description</span>
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={4} className="w-full rounded-xl border px-4 py-2.5 text-sm" />
              </label>

              <Input value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} label="Price" type="number" />
              <Input value={form.discountPercentage} onChange={(e) => setForm((p) => ({ ...p, discountPercentage: e.target.value }))} label="Discount Percentage" type="number" />

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Category</span>
                <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full rounded-xl border px-4 py-2.5 text-sm">
                  <option value="">Select Category</option>
                  {(categories?.data?.category || categories || []).map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Thumbnail</span>
                <Input type="file" onChange={handleFile} />
              </label>

              <div className="flex items-center gap-3">
                <label className="inline-flex items-center">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.checked }))} />
                  <span className="ml-2">Active</span>
                </label>
              </div>

              <div className="flex gap-3">
                <Button type="submit">{updating ? "Saving..." : "Save"}</Button>
                <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
