import Link from "next/link";


const blogs = [
  {
    id: 1,
    title: "Modern Sofa Buying Guide",
    desc: "Choose the perfect sofa for your home with comfort, quality and style.",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: "Furniture",
    date: "June 12, 2026",
  },

  {
    id: 2,
    title: "Best Interior Design Ideas",
    desc: "Make your home beautiful with modern furniture and decoration ideas.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    category: "Interior",
    date: "June 08, 2026",
  },

  {
    id: 3,
    title: "Wood Furniture Care Tips",
    desc: "Learn how to keep your wooden furniture fresh and long lasting.",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91",
    category: "Tips",
    date: "May 30, 2026",
  },

];



export default function BlogPage(){


return (

<div className="min-h-screen bg-[#f8f5f1]">


{/* Header */}

<section className="text-center py-20 px-5 pt-30">


<h1 className="text-5xl font-bold text-gray-900">

Furniture Blog

</h1>


<p className="mt-4 text-gray-600 max-w-xl mx-auto">

Explore furniture guides, home ideas and interior inspiration.

</p>


</section>





{/* Blog */}

<section className="max-w-6xl mx-auto px-6 pb-20">


<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


{
blogs.map((blog)=>(


<div

key={blog.id}

className="
bg-white
rounded-2xl
overflow-hidden
shadow
hover:shadow-xl
transition
"


>


<img

src={blog.image}

alt={blog.title}

className="
w-full
h-64
object-cover
"

/>



<div className="p-6">


<div className="flex justify-between text-sm text-gray-500">


<span>
{blog.category}
</span>


<span>
{blog.date}
</span>


</div>



<h2 className="text-xl font-bold mt-4 text-gray-900">

{blog.title}

</h2>




<p className="mt-3 text-gray-600">

{blog.desc}

</p>




<Link

href={`/blog/${blog.id}`}

className="
inline-block
mt-5
text-[#8b5e3c]
font-semibold
"

>

Read More →

</Link>




</div>



</div>


))

}



</div>


</section>






{/* Subscribe */}


<section className="bg-[#8b5e3c] py-16 px-5">


<div className="max-w-3xl mx-auto text-center text-white">


<h2 className="text-3xl font-bold">

Get Home Design Updates

</h2>


<p className="mt-3">

Subscribe for furniture tips and latest trends.

</p>




<div className="mt-8 flex flex-col md:flex-row gap-3">


<input

type="email"

placeholder="Enter your email"

className="
flex-1
px-5
py-3
rounded-lg
text-black
"

/>



<button

className="
bg-white
text-[#8b5e3c]
px-8
py-3
rounded-lg
font-bold
"

>

Subscribe

</button>


</div>



</div>


</section>




</div>


)


}