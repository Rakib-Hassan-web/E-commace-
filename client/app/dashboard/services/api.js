"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const AdminAPI = createApi({
  reducerPath: "adminApi", // 🔥 MUST
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/", // 🔥 শেষে / রাখো
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
  }),
});

export const { useGetProductQuery, useGetCategoriesQuery, useCreateCategoryMutation } = AdminAPI;