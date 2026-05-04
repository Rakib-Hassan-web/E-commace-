"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
  credentials: "include",
});



const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refreshaccesstoken",
        method: "POST",
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // retry original request
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};


export const AdminAPI = createApi({
  reducerPath: "adminApi", // 🔥 MUST
  baseQuery: baseQueryWithReauth,
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
    createProduct: builder.mutation({
    query: (formData) => ({
    url: "product/create",
    method: "POST",
    body: formData,
  }),
}),
  }),
});

export const { useGetProductQuery, useGetCategoriesQuery, useCreateCategoryMutation ,useCreateProductMutation } = AdminAPI;