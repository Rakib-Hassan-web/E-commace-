"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Button from "@/utils/Button";
import Input from "@/utils/Input";
import Image from "next/image";
import { generateSlug } from "@/utils/sluggenerator";
import {  useCreateProductMutation, useGetCategoriesQuery } from "../../services/api";


export default function ProductsPage() {
 const [createNewProduct, { isError }] = useCreateProductMutation();
  const {data:ALLCategories} = useGetCategoriesQuery()

  console.log(createNewProduct);
  

  
const [variants, setVariants] = useState([]);
const [products, setProducts] = useState([]);

const [newProduct, setNewProduct] = useState({
title: "",
slug: "",
description: "",
category: "",
price: "",
discountPercentage: "",
tags: "",
thumbnail: null,
images:[]
});



useEffect(() => {
handelAddNewVariant();
}, []);


const handelAddNewVariant = () => {
setVariants((prev) => [
...prev,
{
id: Date.now(),
sku: `HETKO-${Math.floor(Math.random() * 100)}`,
color: "",
size: "m",
stock: "",
},
]);
};

  const handelCancleVariant = (id) => {
    if (variants.length > 1) {
      const updatedVariantList = variants.filter((vitem) => vitem.id !== id);
      setVariants(updatedVariantList);
      setNewProduct((prev) => ({ ...prev, variants: updatedVariantList }));
    }
  };

  const handelInputVariant = (id, field, value) => {
    let variantInputChange = variants.map((item) => {
      if (item.id == id) {
        item[field] = value;
      }
      return item;
    });
    setVariants(variantInputChange);
    setNewProduct((prev) => ({ ...prev, variants: variantInputChange }));
  };

// const handleSubmit = (e) => {
// e.preventDefault();

// if (!newProduct.title || !newProduct.price) {
// alert("Title and Price are required!");
// return;
// }

// const finalData = {
// ...newProduct,
// variants,
// id: Date.now(),
// };

// setProducts((prev) => [...prev, finalData]);

// setNewProduct({
// title: "",
// slug: "",
// description: "",
// category: "",
// price: "",
// discountPercentage: "",
// tags: "",
// thumbnail: "",
// });

// setVariants([]);
// handelAddNewVariant();
// };



const handelproductImages = (e) => {
let imags = [...newProduct.images];
imags.push(e.target.files[0]);
setNewProduct((prev) => ({ ...prev, images: imags }));
};

console.log(newProduct);


const handelRemoveImg = (i) => {
const imgs = newProduct.images.filter((item, idx) => idx !== i && item);
setNewProduct((prev) => ({ ...prev, images: imgs }));
};


  const handelNewProduct = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    
    for (const items in newProduct) {
      if (items == "variants") {
       newProduct.variants.forEach((item) => {
          formData.append("variants", item);
        });

      } else if (items == "images") {
        newProduct.images.forEach((file) => {
          formData.append("images", file);
        });
      } else {
        formData.append(items, newProduct[items]);
      }
    }
    const res = await createNewProduct(formData);
    console.log(res);
    if (isError) {
      toast.error(res.message);
    }
    toast.success(res.message);
  };

return (
<div className="flex min-h-screen bg-slate-100 font-[Inter]">
   {/*---------------- SIDEBAR ------------- */}
  <div className="w-64 fixed left-0 top-0 h-full bg-white border-r">
    <Sidebar />
  </div>


  <div className="flex-1 ml-64 flex flex-col">
    <main className="p-5">
    {/* ----------------FORM---------------- */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <form onSubmit={handelNewProduct} className="grid gap-4 md:grid-cols-2">



{/* ------------title---------- */}
            <Input
            value={newProduct.title}
            onChange={(e) => {
              setNewProduct((prev) => ({ ...prev, title: e.target.value }));
              setNewProduct((prev) => ({
                ...prev,
                slug: generateSlug(e.target.value),
              }));
            }}
            placeholder="Enter product title"
            label="Title"
          />


     {/* ------------slug---------- */}

          <Input
           value={newProduct.slug} 
          onChange={(e)=>setNewProduct((prev) => ({...prev, slug: e.target.value,
          }))
          }
          placeholder="product-slug"
          label="Slug"
          />

          {/*---------------------- CATEGORY------------------- */}
         <label className="space-y-2">
           <span className="text-sm font-semibold text-slate-700">
               Category
              </span>

               <select
            value={newProduct.category}
               onChange={(e) =>
              setNewProduct((prev) => ({
              ...prev,
            category: e.target.value,
            }))
              }
    className="w-full rounded-xl border px-4 py-2.5 text-sm"
  >
    <option value="">Select Category</option>

    {(() => {
      const cats =
        ALLCategories?.data?.category || 
        ALLCategories?.data ||           
        ALLCategories ||                
        [];

      return cats.length > 0 ? (
        cats.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))
      ) : (
        <option disabled>No Category Found</option>
      );
    })()}
  </select>
         </label>


          {/*---------------------- price------------------- */}

          <Input value={newProduct.price} 
          onChange={(e)=>
          setNewProduct((prev) => ({
          ...prev,
          price: e.target.value,
          }))
          }
          type="number"
          placeholder="0"
          label="Price"
          main={1}
          />
          {/*---------------------- discountPercentage------------------- */}

          <Input value={newProduct.discountPercentage}
           onChange={(e)=>
          setNewProduct((prev) => ({
          ...prev,
          discountPercentage: e.target.value,
          }))
          }
          type="number"
          placeholder="0"
          label="Discount Percentage"
            max={100}
            min={0}
          />

          {/* --------------DESCRIPTION ----------------*/}
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-semibold text-slate-700">
              Description
            </span>
            <textarea value={newProduct.description} onChange={(e)=>
                    setNewProduct((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows={4}
                  className="w-full rounded-xl border px-4 py-2.5 text-sm"
                />
              </label>

          {/* --------------tages ----------------*/}

              <Input
                value={newProduct.tags}
                onChange={(e) =>
                  setNewProduct((prev) => ({
                    ...prev,
                    tags: e.target.value,
                  }))
                }
                label="Tags"
              />

              


                {/* ----------------THUMBNAIL------------------ */}
         <div >
              <Input
                type="file"
                label="Upload Thumbnail"

              onChange={(e) =>
                setNewProduct((prev) => ({
                  ...prev,
                  thumbnail: e.target.files[0],
                }))
              }

             

              /> 

         {
        newProduct.thumbnail &&
              <Image 
                  src={URL.createObjectURL(newProduct.thumbnail)}
                  width={100}
                  height={200}
                  alt="thumbnail"
                  className="rounded mt-2"
                />
     }


              </div>



{/* -------images-------------- */}

              <div className="flex gap-1" >

                     

                    <Input onChange={handelproductImages} type="file" label="Images" multiple />
                     {
                      newProduct.images.length > 0 &&
                       newProduct.images.map((imgUrl, i) => (
                  <div key={imgUrl} className="relative mt-5 flex gap-1">
                    <Image
                      src={URL.createObjectURL(imgUrl)}
                      width={80}
                      height={100}
                      alt="images"
                      className="rounded border border-slate-600"
                    />
                    <Button
                      onClick={() => handelRemoveImg(i)}
                     
                      
                      className="absolute top-0 right-0 w-1 h-1 "
                    >
                      X
                    </Button>
                  </div>
                ))}
                     



              </div>

{/* -------varients-------------- */}

              <div className="md:col-span-2">
                <div className="flex justify-between">
                  <p className="text-sm font-semibold text-slate-700">
                    Variant Sample
                  </p>
                  <Button type="button" onClick={handelAddNewVariant}>
                    + Add Variant
                  </Button>
                </div>

                {variants.map((vitem) => (
                  <div
                    key={vitem.id}
                    className="mt-2 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 sm:grid-cols-12"
                  >
                    <input
                      value={vitem.sku}
                      onChange={(e) =>
                        handelInputVariant(vitem.id, "sku", e.target.value)
                      }
                      className="rounded-lg border px-3 py-2 text-sm col-span-3"
                      placeholder="SKU"
                    />

                    <input
                      value={vitem.color}
                      onChange={(e) =>
                        handelInputVariant(vitem.id, "color", e.target.value)
                      }
                      className="rounded-lg border px-3 py-2 text-sm col-span-3"
                      placeholder="Color"
                    />

                    <select
                      value={vitem.size}
                      onChange={(e) =>
                        handelInputVariant(vitem.id, "size", e.target.value)
                      }
                      className="rounded-lg border px-3 py-2 text-sm col-span-2"
                    >
                      {["s", "m", "l", "xl"].map((size) => (
                        <option key={size} value={size}>
                          {size.toUpperCase()}
                        </option>
                      ))}
                    </select>

                    <input
                      value={vitem.stock}
                      onChange={(e) =>
                        handelInputVariant(vitem.id, "stock", e.target.value)
                      }
                      type="number"
                      className="rounded-lg border px-3 py-2 text-sm col-span-2"
                      placeholder="Stock"
                    />

                    {variants.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => handelCancleVariant(vitem.id)}
                        variant="danger"
                        className="col-span-2"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="md:col-span-2 flex gap-3">
                <Button type="submit">Save Product</Button>
              </div>
            </form>
          </section>

          {/* ===== TABLE ===== */}
          {products.length > 0 && (
            <section className="mt-5 bg-white p-5 rounded-3xl shadow-sm overflow-x-auto">
              <h2 className="font-semibold mb-4">Product List</h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((item) => {
                    const totalStock = item.variants.reduce(
                      (acc, v) => acc + Number(v.stock || 0),
                      0
                    );

                    return (
                      <tr key={item.id} className="border-b">
                        <td className="py-2">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              className="w-14 h-14 object-cover rounded"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>

                        <td>{item.title}</td>
                        <td>৳ {item.price}</td>
                        <td>{totalStock}</td>

                        <td className="space-x-2">
                          <button className="text-blue-500">Edit</button>
                          <button className="text-red-500">Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}