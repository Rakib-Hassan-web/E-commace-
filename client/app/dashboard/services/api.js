"use client";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const baseQuery = fetchBaseQuery({
  baseUrl: "/api/",
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
      extraOptions
    );


    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};



export const AdminAPI = createApi({
  reducerPath: "adminApi",

  baseQuery: baseQueryWithReauth,

  tagTypes: [
    "product",
    "Categories",
    "Users"
  ],


  endpoints: (builder) => ({



    // ================= PRODUCT =================

    getProduct: builder.query({

      query: () => "product/allProducts",

      transformResponse: (response) => {
        return response?.data?.product || response?.product || [];
      },

      providesTags:["product"]

    }),



    createProduct: builder.mutation({

      query: (formData) => ({
        url: "product/create",
        method: "POST",
        body: formData,
      }),

      invalidatesTags:["product"]

    }),





    // ================= USERS =================


    getUsers: builder.query({

      query: () => "users/allUsers",

      transformResponse: (response) => {
        return response?.data?.users || response?.users || [];
      },

      providesTags:["Users"]

    }),






    // ================= CATEGORY =================


    getCategories: builder.query({

      query: () => "category/all",

      providesTags:["Categories"],

    }),



    createCategory: builder.mutation({

      query: (formData) => ({
        url:"category/create",
        method:"POST",
        body:formData,
      }),

      invalidatesTags:["Categories"]

    }),




    updateCategory: builder.mutation({

      query: ({id, formData}) => ({

        url:`category/${id}/update`,
        method:"PATCH",
        body:formData,

      }),

      invalidatesTags:["Categories"]

    }),




    deleteCategory: builder.mutation({

      query:(id)=>({

        url:`category/${id}/delete`,
        method:"DELETE",

      }),

      invalidatesTags:["Categories"]

    }),


  }),


});




// hooks export

export const {

  useGetProductQuery,

  useCreateProductMutation,

  useGetUsersQuery,

  useGetCategoriesQuery,

  useCreateCategoryMutation,

  useUpdateCategoryMutation,

  useDeleteCategoryMutation,


} = AdminAPI;