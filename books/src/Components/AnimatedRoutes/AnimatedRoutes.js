import React from 'react'
import { AnimatePresence } from 'framer-motion'
import Trending_image from '../../Data/Trending_image.jpeg'
import Best_sellers_image from '../../Data/Best_sellers_image.jpeg'
import Today_deal from '../../Data/Today_deal.jpeg'
import LoginSignUp from "../../Pages/LoginSignUp";
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
        <Route path="/Best sellers" element={<ShopCategory banner={Best_sellers_image} category="Best sellers" />}/>
        <Route path="/Deals for Today" element={<ShopCategory banner={Today_deal} category="Deals for Today"/>}/>
        <Route path="/product" element={<Product />}>
          <Route path=":productId" element={<Product/>} />
        </Route>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/login" element={<LoginSignUp/>}/>
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
