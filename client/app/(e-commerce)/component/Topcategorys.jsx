import React from 'react'

const Topcategorys = () => {
  return (
    <>
      <section id='top_category' className='py-[80px] md:py-[120px] bg-white px-4'>
        <div className="container mx-auto">
          {/* -------- Heading -------- */}
          <div>
            <h1 className='font-aby font-normal text-[28px] md:text-[42px] text-[#1A0B5B] text-center mb-10 whitespace-nowrap overflow-hidden text-ellipsis'>
              Featured Products
            </h1>
          </div>

          {/* -------- Product Grid -------- */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center'>

            {/* -------- Single Product -------- */}
            {[1, 2, 3, 4].map((item, i) => (
              <div
                key={i}
                className='w-[250px] sm:w-[270px] flex flex-col items-center relative group'
              >
                {/* Image Container */}
                <div className='w-[200px] sm:w-[230px] h-[200px] sm:h-[230px] rounded-full bg-gray-100 overflow-hidden relative'>
                  <img
                    src="#"
                    alt="product image"
                    className='w-full h-full object-cover rounded-full'
                  />

                  {/* Hover Button (Inside Image Area) */}
                  <button
                    className='absolute inset-x-0 bottom-4 mx-auto w-fit font-lato font-medium px-4 py-2 bg-green-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition duration-300 shadow-md'
                  >
                    View Shop
                  </button>
                </div>

                {/* Product Info */}
                <div className='mt-4 text-center'>
                  <p className='text-[16px] md:text-[18px] font-medium text-[#151875] font-adaminaaa'>
                    Mini LCW Chair
                  </p>
                  <p className='text-[14px] font-semibold text-[#151875] mt-[6px] font-lato'>
                    $56.00
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Topcategorys
