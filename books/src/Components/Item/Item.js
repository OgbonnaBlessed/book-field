import React from 'react'
import './Item.css'
import formatCurrency from '../../Utils/Money'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

const Item = (props) => {
  return (
    <Link to={`/product/${props.id}`}>
    <div className='item' onClick={window.scrollTo(0, 0)}>
      <img src={`${process.env.PUBLIC_URL}/${props.image}`} alt="" />
      <p className='name'>{props.name} by <i>{props.author}</i></p>
      <div className='price-box'>
        <p className="price">${formatCurrency(props.priceCents)}</p>
        {props.discount && <p className='discount'>${props.discount}</p>}
      </div>
      <FaHeart className='heart-icon' />
    </div>
    </Link>
  )
}

export default Item
