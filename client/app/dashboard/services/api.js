"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminAPI = createApi({
  reducerPath: "adminApi", 
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/", 
    credentials: 'include',
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: () => "product/allProducts",
      transformResponse: (response) => {
        // server responses use { success, message, data }
        // normalize to return array of products directly
        return response?.data?.product || response?.product || []
      }
    }),
    getCategories: builder.query({
      query: () => "category/all",
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation({
      query: (formData) => ({
        url: "category/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Categories"],
    }),

    creteNewProduct : builder.mutation({
      query:(Prodata) =>({
        url: "/product/create",
        method:"POST",
        headers: { "Content-Type": "multipart/form-data" },
        body:Prodata,

      })
    })
  
 }),
});

export const { useGetProductQuery, useGetCategoriesQuery, useCreateCategoryMutation ,useCreteNewProductMutation} = AdminAPI;