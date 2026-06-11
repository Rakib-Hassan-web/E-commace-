"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    id: 1,
    title: "How To Choose The Perfect Sofa For Your Home",
    desc: "Learn how to pick the right sofa based on your space, comfort, fabric and interior style.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    date: "June 10, 2026",
    category: "Living Room",
  },
  {
    id: 2,
    title: "Modern Furniture Trends For 2026",
    desc: "Explore the latest furniture designs that are changing modern home interiors.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    date: "June 05, 2026",
    category: "Interior",
  },
  {
    id: 3,
    title: "Small Space Furniture Ideas",
    desc: "Smart furniture solutions to make your small apartment look bigger and stylish.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    date: "May 28, 2026",
    category: "Home Design",
  },
  {
    id: 4,
    title: "Wood Furniture Care Guide",
    desc: "Simple tips to keep your wooden furniture looking new for years.",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91",
    date: "May 20, 2026",
    category: "Care Tips",
  },
];


const BlogPage = () => {
  return (
    <div className="bg-[#faf8f5] min-h-screen">

      {/* Hero */}
      <section className="py-20 text-center px-5">
        <h1 className="text-5xl font-bold text-gray-900">
          Furniture Blog
        </h1>

        <p className="mt-5 text-gray-600 max-w-xl mx-auto">
          Discover furniture guides, interior ideas and tips to create your dream home.
        </p>
      </section>


      {/* Blog Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


          {blogs.map((blog)=>(
            
            <div
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >

              <div className="relative h-64">

                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />

              </div>


              <div className="p-6">

                <div className="flex justify-between text-sm text-gray-500">

                  <span>{blog.category}</span>
                  <span>{blog.date}</span>

                </div>


                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {blog.title}
                </h2>


                <p className="mt-3 text-gray-600">
                  {blog.desc}
                </p>


                <Link
                  href={`/blog/${blog.id}`}
                  className="inline-block mt-5 text-[#8b5e3c] font-semibold"
                >
                  Read More →
                </Link>


              </div>


            </div>

          ))}



        </div>

      </section>


      {/* Newsletter */}

      <section className="bg-[#8b5e3c] py-16 px-5">

        <div className="max-w-4xl mx-auto text-center text-white">

          <h2 className="text-3xl font-bold">
            Get Furniture Ideas In Your Inbox
          </h2>

          <p className="mt-3">
            Subscribe for home design tips and latest furniture updates.
          </p>


          <div className="mt-8 flex flex-col md:flex-row gap-3">

            <input
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-lg text-black outline-none"
            />


            <button className="bg-white text-[#8b5e3c] px-8 py-3 rounded-lg font-bold">
              Subscribe
            </button>

          </div>

        </div>

      </section>


    </div>
  );
};


export default BlogPage;