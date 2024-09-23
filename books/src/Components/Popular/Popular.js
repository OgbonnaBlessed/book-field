import React from 'react'
import './Popular.css'
import {product} from '../../Data/Data'
import Item from '../Item/Item';

const Popular = () => {
    const data_produt = product.filter(product => product.category.includes('Popular'));
  return (
    <div className='Popular'>
        <div className="heading">
            <div className='line1'></div>
            <h1>Popular Trending Items</h1>
            <div className='line2'></div>
        </div>
        <div className="popular-item">
            {data_produt.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} author={item.author} priceCents={item.priceCents} image={item.image} />
            })}
        </div>
    </div>
  )
}

export default Popular
