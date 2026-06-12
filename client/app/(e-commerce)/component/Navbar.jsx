"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { usePathname } from "next/navigation";

import {
FaBars,
FaTimes,
FaShoppingCart
} from "react-icons/fa";

import { useCart } from "@/context/CartContext";
import CartDropdown from "./CartDropdown";


const Navbar = () => {


const [menuOpen,setMenuOpen] = useState(false);
const [cartOpen,setCartOpen] = useState(false);
const [scrolled,setScrolled] = useState(false);


const { totalCount } = useCart();

const pathname = usePathname();



useEffect(()=>{


const handleScroll = () => {
setScrolled(window.scrollY > 20);
}


window.addEventListener("scroll",handleScroll);


return ()=> {
window.removeEventListener("scroll",handleScroll);
}


},[]);



if(
pathname.startsWith("/dashboard") ||
pathname.startsWith("/admin")
){
return null;
}





const navItems=[

{
name:"Home",
href:"/"
},

{
name:"Shop",
href:"/product"
},

{
name:"Blog",
href:"/blog"
},

{
name:"About",
href:"/about"
},

{
name:"Contact",
href:"/Contact"
},

{
name:"Login",
href:"/Login"
},

{
name:"Dashboard",
href:"/dashboard"
}

];





return (

<nav className={` fixed top-0 left-0 w-full z-50 transition-all duration-300 ${ scrolled
  ? "bg-white/80 backdrop-blur-md shadow-md py-4" : "bg-[#f8e3f6] py-6" } `}>


  <div className="
container mx-auto px-4
flex items-center justify-between
">



    {/* LOGO */}

    <Link href="/" className="w-30">


    <Image src="/Hekto.png" alt="Hekto Logo" width={200} height={60} priority className="
w-full
h-auto
" />


    </Link>





    {/* MENU */}


    <ul className="hidden md:flex gap-7">


      {
      navItems.map(item=>{


      const active =
      pathname === item.href ||
      (
      item.href !== "/" &&
      pathname.startsWith(item.href)
      );



      return (

      <li key={item.name}>


        <Link href={item.href}>


        <span className={` font-semibold relative ${ active ? "text-[#FB2E86]" : "text-[#0D0E43] hover:text-[#FB2E86]" }
          `}>


          {item.name}



          <span className={` absolute left-0 -bottom-1 h-[2px] bg-[#FB2E86] transition-all ${active ? "w-full" :"w-0"}
            `}>



          </span>


        </span>


        </Link>


      </li>


      )


      })

      }



    </ul>







    {/* DESKTOP CART */}


    <div className="hidden md:block relative">


      <button onClick={()=>setCartOpen(!cartOpen)}

        className="relative text-[#0D0E43]"

        >


        <FaShoppingCart size={22} />



        {
        totalCount > 0 &&
        <span className="
absolute -top-2 -right-2
bg-[#FB2E86]
text-white
w-5 h-5
rounded-full
text-xs
flex items-center justify-center
">

          {totalCount}

        </span>
        }



      </button>





      {
      cartOpen &&
      <div className="
absolute right-0 top-10
w-[350px]
z-[999]
">

        <CartDropdown />

      </div>
      }


    </div>








    {/* MOBILE */}


    <div className="
md:hidden flex items-center gap-5
">


      <button onClick={()=>setCartOpen(!cartOpen)}

        className="relative"

        >

        <FaShoppingCart size={21} />


        {
        totalCount>0 &&
        <span className="
absolute -top-2 -right-2
bg-[#FB2E86]
text-white
rounded-full
w-5 h-5
text-xs
flex items-center justify-center
">

          {totalCount}

        </span>
        }


      </button>





      <button onClick={()=>setMenuOpen(!menuOpen)}

        >

        {
        menuOpen
        ?
        <FaTimes size={24} />
        :
        <FaBars size={24} />
        }

      </button>



    </div>



  </div>









  {/* MOBILE MENU */}


  <div className={` md:hidden bg-white shadow-lg transition-all duration-300 ${ menuOpen ? "max-h-96 opacity-100"
    : "max-h-0 overflow-hidden opacity-0" } `}>


    <ul className="px-5 py-5 space-y-4">


      {
      navItems.map(item=>(

      <li key={item.name} onClick={()=>setMenuOpen(false)}

        >


        <Link href={item.href} className="
font-semibold text-[#0D0E43]
">

        {item.name}

        </Link>


      </li>


      ))
      }



    </ul>


  </div>




</nav>


)

}


export default Navbar;