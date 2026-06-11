"use client";

import Link from "next/link";
import React,{ useState, useEffect}
from "react";
import Image from "next/image";

import { usePathname}

from "next/navigation";

import {FaBars,FaTimes,FaShoppingCart}

from "react-icons/fa";

import {useCart}

from "@/context/CartContext";
import CartDropdown from "./CartDropdown";


const Navbar=()=> {

  const [menuOpen,setMenuOpen]=useState(false);
  const [cartOpen,setCartOpen]=useState(false);
  const [scrolled,setScrolled]=useState(false);

  const {totalCount} =useCart();
  const pathname=usePathname();


  useEffect(()=> {

      const handleScroll=()=> { setScrolled(window.scrollY > 20); } ;

      window.addEventListener("scroll", handleScroll);

      return ()=> {
        window.removeEventListener("scroll", handleScroll);
      };

    }

    , []);

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }


  const navItems=[ { name: "Home", href:"/" },

     {name: "Shop", href:"/product"},

    {
    name: "Blog", href:"/blog"},

    {name: "About", href:"/about"},

    {name: "Contact", href:"/Contact"},

    {name: "Login", href:"/Login"},

    { name: "Dashboard", href:"/dashboard"},
  ];




  return (<nav className= {
      ` fixed top-0 w-full z-50 transition-all duration-300 $ {
        scrolled ? "bg-white/70 backdrop-blur-md shadow-md py-5 px-5"
        : "bg-[#f8e3f6] py-6"
      }
      `
    }

    > <div className="container mx-auto flex items-center justify-between px-4"> {
      /* LOGO */
    }

    <Link href="/"> <Image src="/Hekto.png"

    width= { 98 }

    height= {34}

    alt="logo"

    /> </Link> {
      /* DESKTOP MENU */
    }

    <ul className="hidden md:flex gap-6"> {
      navItems.map((item)=> {

          const active=pathname===item.href || (item.href !=="/"&& pathname.startsWith(item.href));

          return (<li key= {
              item.name
            }

            > <Link href= { item.href }

            > <span className= {
              ` relative cursor-pointer font-semibold $ {
                active ? "text-[#FB2E86]"
                : "text-[#0D0E43] hover:text-[#FB2E86]"
              }

              `
            }

            > {
              item.name
            }


            <span className= {
              ` absolute -bottom-1 left-0 h-[2px] bg-[#FB2E86] transition-all $ {
                active ? "w-full" : "w-0"
              }

              `
            }

            ></span> </span> </Link> </li>)
        }

      )
    }


    </ul> {
      /* DESKTOP CART */
    }

    <div className="hidden md:block relative"> <button onClick= {
      ()=>setCartOpen(prev=> !prev)
    }

    className="relative p-2 text-[#0D0E43]"

    > <FaShoppingCart size= {
      22
    }

    /> {
      totalCount > 0 && <span className="
absolute -top-1 -right-1 bg-[#FB2E86] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center "


      > {
        totalCount
      }

      </span>
    }


    </button> {
      cartOpen && <div className="
absolute right-0 top-full mt-3 w-[350px] z-[999] "

      > <CartDropdown/> </div>
    }


    </div> {
      /* MOBILE CONTROL */
    }


    <div className="md:hidden flex items-center gap-4 relative"> {
      /* MOBILE CART */
    }


    <div className="relative"> <button onClick= {
      ()=>setCartOpen(prev=> !prev)
    }

    className="text-[#0D0E43]"

    > <FaShoppingCart size= {
      21
    }

    /> {
      totalCount > 0 && <span className="
absolute -top-2 -right-3 bg-[#FB2E86] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center "


      > {
        totalCount
      }

      </span>
    }


    </button> {
      cartOpen && <div className="
absolute right-0 top-full mt-3 w-[300px] z-[999] "

      > <CartDropdown/> </div>
    }



    </div> <button onClick= {
      ()=>setMenuOpen( !menuOpen)
    }

    className="text-[#0D0E43]"

    > {
      menuOpen ? <FaTimes size= {
        24
      }

      />: <FaBars size= {
        24
      }

      />
    }


    </button> </div> </div> {
      /* MOBILE MENU */
    }


    <div className= {
      ` md:hidden absolute w-full bg-white shadow-lg transition-all $ {
        menuOpen ? "top-full opacity-100"
        : "top-[-500px] opacity-0 pointer-events-none"
      }

      `
    }

    > <ul className="flex flex-col gap-4 px-5 py-6"> {
      navItems.map((item)=>(<li key= {
            item.name
          }

          onClick= {
            ()=>setMenuOpen(false)
          }

          > <Link href= {
            item.href
          }

          > <span className= {
            ` font-semibold $ {
              pathname===item.href ? "text-[#FB2E86]"
              : "text-[#0D0E43]"
            }

            `
          }

          > {
            item.name
          }


          </span> </Link> </li>))
    }


    </ul> </div> </nav>);


}

;


export default Navbar;