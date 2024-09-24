import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { FaListAlt } from 'react-icons/fa'
import './Sidebar.css'

const Sidebar = () => {
    const [tab, setTab] = useState('');
    const location = useLocation();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');

        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search, setTab]);

  return (
    <div className='side-bar'>
      <Link 
        className={`page-direct ${tab === 'add-products' ? 'active' : ''}`}
        to={'/Admin?tab=add-products'}>
        <AiOutlinePlusCircle size={25}/>
        <p>Add Products</p>
      </Link>
      <Link 
        className={`page-direct ${tab === 'product-list' ? 'active' : ''}`}
        to={'/Admin?tab=product-list'}>
        <FaListAlt size={25}/>
        <p>Product List</p>
      </Link>
    </div>
  )
}

export default Sidebar
