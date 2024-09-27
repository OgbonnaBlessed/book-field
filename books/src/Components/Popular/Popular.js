import React, { useState, useEffect} from 'react'
import './Popular.css'
// import {product} from '../../Data/Data'
import Item from '../Item/Item';

const Popular = () => {
    // const data_produt = product.filter(product => product.category.includes('Popular'));
    const [popular, setPopular] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/popular')
      .then((res) => res.json())
      .then((data) => setPopular(data));
    }, []);

  return (
    <div className='Popular'>
        <div className="heading">
            <div className='line1'></div>
            <h1>Popular Trending Items</h1>
            <div className='line2'></div>
        </div>
        <div className="popular-item">
            {popular.map((item, i) => {
                return <Item key={i} id={item.id} name={item.name} author={item.author} priceCents={item.priceCents} image={item.image} />
            })}
        </div>
    </div>
  )
}

export default Popular
