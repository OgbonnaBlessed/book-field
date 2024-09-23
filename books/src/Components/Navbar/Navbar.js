import React, { useContext } from 'react'
import './Navbar.css'
import { FaHeart } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { BookContext } from '../../Context/BookContext'

const Navbar = () => {
  const { getTotalCartItems } = useContext(BookContext);

  return (
    <>
    <div className='nav-bar-container'>
      <Link to="/" className="left-content">
        <img src={`${process.env.PUBLIC_URL}/icon.png`} alt="Company logo" />
        <h2>BookField</h2>
      </Link>

        <div className="nav-box">
            <NavLink to="/Trending">Trending</NavLink>
            <NavLink to="/Best sellers">Best selling</NavLink>
            <NavLink to="/Deals for Today">Today's deals</NavLink>
        </div>
      <div className="right-content">
        <Link to="/Cart" className="cart-box">
            <MdOutlineShoppingCart size={40} />
            <span>{getTotalCartItems()}</span>
        </Link>
        <div className="wish-box">
            <FaHeart size={40} color='rgb(219, 21, 21)' />
            <span>0</span>
        </div>
        <Link to="/login"><button>Login</button></Link>
      </div>
    </div>
    </>
  )
}

export default Navbar