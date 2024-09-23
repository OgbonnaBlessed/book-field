import React from 'react'
import './RelatedProducts.css'
import { product } from '../../Data/Data';
import Item from '../Item/Item';

const RelatedProducts = () => {
    
  return (
    <div className='related-products'>
      <div className="heading">
        <div className="line1"></div>
        <h1>Related Products</h1>
        <div className="line2"></div>
      </div>
      <div className="related-products-item">
        {product.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} author={item.author} priceCents={item.priceCents} image={item.image} discount={item.discount} />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts