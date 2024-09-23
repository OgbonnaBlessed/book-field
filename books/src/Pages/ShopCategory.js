import React, { useContext } from 'react'
import { BookContext } from '../Context/BookContext'
import './CSS/ShopCategory.css'
import Item from '../Components/Item/Item';
import { FaAngleDown } from 'react-icons/fa';

const ShopCategory = (props) => {
  const { product } = useContext(BookContext);
  const productSort = product.filter(product => product.category.includes(props.category));

  return (
    <div className='shop-category'>
      <img className='banner' src={props.banner} alt="" />

      <div className="display">
        <p className='show'>showing 12 out of 20 products</p>
        <div className='button'>
          <p>sort by</p>
          <FaAngleDown />
        </div>
      </div>

      <div className="shop-category-content">
        <div className="heading">
          <div className="line1"></div>
          <h1>{props.category}</h1>
          <div className="line2"></div>
        </div>
        <div className="shop-category-item">
          {productSort.map((item, i) => {
              return <Item key={i} id={item.id} name={item.name} author={item.author} priceCents={item.priceCents} image={item.image} discount={item.discount} />
          })}
        </div>
        <p className="show">see more</p>
      </div>
    </div>
  )
}

export default ShopCategory;