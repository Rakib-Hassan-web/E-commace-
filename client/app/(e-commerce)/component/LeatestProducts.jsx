"use client"
import Link from 'next/link'
import React from 'react'
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiSelfLove } from "react-icons/gi";
import { useGetProductQuery } from '@/app/dashboard/services/api'

const LeatestProducts = () => {
  const { data, error, isLoading } = useGetProductQuery()
  const products = data?.product || []

  return (
    <>
      <section id='latestproduct' className='mt-[100px] px-4'>
        <div className="container mx-auto">
          {/* Heading */}
          <h1 className='font-aby font-normal text-[36px] md:text-[42px] text-[#1A0B5B] text-center'>
            Leatest Products
          </h1>

          {/* Category Links */}
          <div className='flex flex-wrap justify-center gap-6 mt-4'>
            {["New Arrival", "Best Seller", "Featured", "Special Offer"].map((item, i) => (
              <Link
                key={i}
                href={'#'}
                className='font-lato text-[16px] md:text-[18px] text-[#151875] hover:underline hover:text-[#FB2448] duration-300'
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Products Grid */}
          <div className='mt-[60px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
            {isLoading && <p>Loading products...</p>}
            {error && <p className='text-red-500'>Failed to load products</p>}
            {!isLoading && products.length === 0 && (
              <p>No products available</p>
            )}
            {products.map((p, index) => (
              <div key={p._id || index} className='relative group w-full max-w-[360px] mx-auto'>
                <div className='w-full h-[270px] bg-gray-100 rounded-md relative overflow-hidden flex items-center justify-center'>
                  {p.thumbnail ? (
                    <img src={p.thumbnail} alt={p.title} className='object-contain w-full h-full' />
                  ) : (
                    <div className='w-full h-full bg-gray-200' />
                  )}

                  {/* Hover icons */}
                  <div className="absolute top-6 left-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition duration-300">
                    <button className="bg-white p-2 rounded-full shadow hover:bg-[#FB2448] hover:text-white duration-300">
                      <AiOutlineShoppingCart />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow hover:bg-[#FB2448] hover:text-white duration-300">
                      <GiSelfLove />
                    </button>
                  </div>
                </div>

                {/* Product info */}
                <div className='mt-4 flex items-center justify-between'>
                  <h2 className='font-adaminaaa font-medium text-sm md:text-base text-[#151875]'>
                    {p.title}
                  </h2>
                  <div className='flex gap-2 md:gap-3'>
                    <p className='font-adaminaaa font-bold text-[14px] text-[#151875]'>${p.price}</p>
                    {p.discountPercentage && (
                      <p className='font-adaminaaa font-bold text-[12px] text-[#FB2448] line-through'>${Math.round(p.price)}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default LeatestProducts
