import React from 'react'
import Navbar from './(e-commerce)/component/Navbar'
import Banner from './(e-commerce)/component/Banner'
import FeaturedProducts from './(e-commerce)/component/FeaturedProducts'
import LeatestProducts from './(e-commerce)/component/LeatestProducts'
import Offer from './(e-commerce)/component/Offer'
import UniqueProduct from './(e-commerce)/component/UniqueProduct'
import TreandingProduct from './(e-commerce)/component/TreandingProduct'
import Discount from './(e-commerce)/component/Discount'
import Subscribe from './(e-commerce)/component/Subscribe'
import Topcategorys from './(e-commerce)/component/Topcategorys'
import Blog from './(e-commerce)/component/Blog'
import Footer from './(e-commerce)/component/Footer'

const page = () => {
  return (
    <>



    <Banner/>
    <FeaturedProducts/>
    <LeatestProducts/>
    <Offer/>
    <UniqueProduct/>
    <TreandingProduct/>
    <Discount/>
    <Topcategorys/>
    <Subscribe/>
    <Blog/>
    <Footer/>
    
    </>
  )
}

export default page