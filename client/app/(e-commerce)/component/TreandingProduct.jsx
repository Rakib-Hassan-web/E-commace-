import React from 'react'

const TreandingProduct = () => {
  const products = [
    { id: 1, name: "Cantilever chair", code: "Y523201", price: "$42.00" },
    { id: 2, name: "Cantilever chair", code: "Y523201", price: "$42.00" },
    { id: 3, name: "Cantilever chair", code: "Y523201", price: "$42.00" },
    { id: 4, name: "Cantilever chair", code: "Y523201", price: "$42.00" },
  ];

  return (
    <>
      <section id='TreandingProducts' className='mt-[100px] px-4 md:px-8 lg:px-16'>
        <div className="container mx-auto">
          {/* ---------- Title ---------- */}
          <div className="text-center mb-10">
            <h1 className='font-aby font-normal text-[32px] md:text-[42px] text-[#1A0B5B]'>
              Trending Products
            </h1>
          </div>

          {/* ---------- Responsive Grid ---------- */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center'>

            {products.map((item) => (
              <div key={item.id}
                className='w-full sm:w-[250px] md:w-[270px] h-auto shadow-[0px_4px_30px_0px_rgba(31,_38,_135,_0.15)] rounded-md p-4 
                hover:bg-[#2F1AC4] hover:text-white duration-300 group'
              >
                <div className='w-full h-[214px] bg-gray-100 rounded-md mb-4'></div>

                <h2 className='text-[18px] font-bold text-[#FB2E86] text-center font-lato group-hover:text-white'>
                  {item.name}
                </h2>

                <div className='flex justify-center items-center gap-2 mt-3'>
                  <button className='w-5 h-1.5 bg-red-500 rounded-full cursor-pointer'></button>
                  <button className='w-5 h-1.5 bg-blue-500 rounded-full cursor-pointer'></button>
                  <button className='w-5 h-1.5 bg-green-500 rounded-full cursor-pointer'></button>
                </div>

                <p className='text-[14px] font-semibold text-[#151875] text-center mt-3 font-lato group-hover:text-white'>
                  Code - {item.code}
                </p>

                <p className='text-[14px] font-semibold text-[#151875] text-center mt-2 font-lato group-hover:text-white'>
                  {item.price}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  )
}

export default TreandingProduct
