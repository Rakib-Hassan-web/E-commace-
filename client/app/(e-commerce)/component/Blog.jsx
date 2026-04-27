// components/BlogSection.jsx
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";

const blogs = [
  {
    id: 1,
    img: "https://picsum.photos/400/300?random=1",
    author: "Saber Ali",
    date: "21 August, 2020",
    title: "Top esssential Trends in 2021",
    desc: "More off this less hello samlande lied much over tightly circa horse taped mightly",
  },
  {
    id: 2,
    img: "https://picsum.photos/400/300?random=2",
    author: "Surfuxion",
    date: "21 August, 2020",
    title: "Top esssential trends in 2021",
    desc: "More off this less hello samlande lied much over tightly circa horse taped mightly",
  },
  {
    id: 3,
    img: "https://picsum.photos/400/300?random=3",
    author: "Saber Ali",
    date: "21 August, 2020",
    title: "Top esssential Trends in 2021",
    desc: "More off this less hello samlande lied much over tightly circa horse taped mightly",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 mt-[150px]">
        <div className="container">

      <h2 className="text-center text-[42px]  font-adaminaaa font-normal text-[#151875] mb-12">
      Leatest Blog
      </h2>
      <div className="container mx-auto grid md:grid-cols-3 gap-8 px-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="shadow-lg rounded-lg overflow-hidden bg-white"
          > 
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-[220px] object-cover"
            />
            <div className="p-5">
              {/* author & date */}
              <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                <span className="flex items-center space-x-1">
                  <FaUser className="text-pink-500" />
                  <span className="text-lota text-[#151875] font-bold text-sm ">{blog.author}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <FaCalendarAlt className="text-yellow-500" />
                  <span className="text-lota text-[#151875] font-bold text-sm ">{blog.date}</span>
                </span>
              </div>

              {/* title */}
              <h3 className="text-lg font-semibold text-[#151875] font-lato hover:text-pink-600 cursor-pointer">
                {blog.title}
              </h3>
              <p className="text-gray-500 text-sm mt-2 font-lato">{blog.desc}</p>

              {/* read more */}
              <Link
                href="#"
                className="text-pink-600 font-medium mt-4 inline-block hover:underline font-lato"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
