"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaTimes } from "react-icons/fa";
import Input from "@/utils/Input";
import Button from "@/utils/Button";

const Navbar = () => {
  // 1. Shob Hooks ekhane (Top Level) thakbe
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Condition-ti Hooks-er niche hobe (Early Return)
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/admin")) {
    return null;
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/product" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/Contact" },
    { name: "Login", href: "/Login" },
    { name: "Dashboard", href: "/dashboard" },

  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-md shadow-md py-5" 
          : "bg-[#f8e3f6] py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        
        {/* ----- Logo ----- */}
        <Link href="/" passHref>
          <div className="cursor-pointer">
            <Image
              src="/Hekto.png"
              alt="Logo"
              width={98}
              height={34}
              priority
            />
          </div>
        </Link>

        {/* ----- Desktop Menu ----- */}
        <ul className="hidden md:flex gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <li key={item.name}>
                <Link href={item.href} passHref>
                  <span className={`text-base font-lato font-semibold duration-300 cursor-pointer relative group ${
                    isActive ? "text-[#FB2E86]" : "text-[#0D0E43] hover:text-[#FB2E86]"
                  }`}>
                    {item.name}
                    {/* Active Page Indicator */}
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#FB2E86] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* ----- Search Bar (Desktop) ----- */}
        <div className="hidden md:flex items-center ml-6">
          <Input
            placeholder="Search..."
            className="w-[200px] lg:w-[250px]"
            inputClassName="rounded-l-md border-r-0 h-[40px]"
          />
          <Button className=" ml-2 rounded-r-md p-20 text-20xl bg-[#FB2E86] text-white hover:bg-[#e02a7a] transition-colors">
            <CiSearch />
          </Button>
        </div>

        {/* ----- Hamburger Menu Button ----- */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#0D0E43] transition-transform active:scale-90">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* ----- Mobile Menu ----- */}
      <div className={`md:hidden absolute w-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
        menuOpen ? "top-full opacity-100" : "top-[-500px] opacity-0 pointer-events-none"
      }`}>
        <ul className="flex flex-col gap-4 px-4 py-6">
          {navItems.map((item) => (
            <li key={item.name} onClick={() => setMenuOpen(false)}>
              <Link href={item.href} passHref>
                <span className={`block font-semibold py-2 ${pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href)) ? "text-[#FB2E86]" : "text-[#0D0E43]"}`}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
          
          <div className="flex mt-2">
            <Input
              placeholder="Search..."
              className="w-full"
              inputClassName="rounded-l-md border-r-0"
            />
            <Button className="w-[50px] h-[50px] rounded-r-md p-0 text-2xl bg-[#FB2E86] text-white">
              <CiSearch />
            </Button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;