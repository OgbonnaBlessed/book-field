import React from 'react'
import './Breadcrumb.css'
import { FaAngleRight } from 'react-icons/fa';

const Breadcrumb = ({ product }) => {
    
  return (
    <div className='breadcrumb'>
      Home <FaAngleRight /> Shop <FaAngleRight/> {product.category} <FaAngleRight/> {product.name}
    </div>
  )
}

export default Breadcrumb