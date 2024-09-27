import React from 'react'
import { AnimatePresence } from 'framer-motion'
import Trending_image from '../../Data/Trending_image.jpeg'
import Best_sellers_image from '../../Data/Best_sellers_image.jpeg'
import Today_deal from '../../Data/Today_deal.jpeg'
import SignUp from "../../Pages/SignUp";
import LogIn from "../../Pages/LogIn";
import Shop from '../../Pages/Shop'
import ShopCategory from '../../Pages/ShopCategory'
import Product from "../../Pages/Product";
import Cart from "../../Pages/Cart";
import { Routes, Route} from 'react-router-dom'

const AnimatedRoutes = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path="/Trending" element={<ShopCategory banner={Trending_image} category="Trending" />}/>
        <Route path="/Best sellers" element={<ShopCategory banner={Best_sellers_image} category="Best Sellers" />}/>
        <Route path="/Deals for Today" element={<ShopCategory banner={Today_deal} category="Today's Deals"/>}/>
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product/>} />
        </Route>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
