import React from 'react'
import './Breadcrumb.css'
import { FaAngleRight } from 'react-icons/fa';

const Breadcrumb = (props) => {
    const { product } = props;
  return (
    <div className='breadcrumb'>
      Home <FaAngleRight /> Shop <FaAngleRight/> {product.category[0]} <FaAngleRight/> {product.name}
    </div>
  )
}

export default Breadcrumb