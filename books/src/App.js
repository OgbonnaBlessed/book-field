import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Shop from './Pages/Shop'
import ShopCategory from './Pages/ShopCategory'
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Footer from './Components/Footer/Footer'
import Trending_image from './Data/Trending_image.jpeg'
import Best_sellers_image from './Data/Best_sellers_image.jpeg'
import Today_deal from './Data/Today_deal.jpeg'
import LoginSignUp from "./Pages/LoginSignUp";

function App() {
  return (
    <div>
      <Router>
      <Navbar />
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
      <Footer />
      </Router>
    </div>
  );
}

export default App;
