import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar';
import AddProducts from '../AddProducts/AddProducts';
import ProductList from '../ProductList/ProductList';
import './Admin.css'

const Admin = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='Admin'>
      <Sidebar/>

      {tab === 'add-products' && <AddProducts/>}
      {tab === 'product-list' && <ProductList/>}
    </div>
  )
}

export default Admin
