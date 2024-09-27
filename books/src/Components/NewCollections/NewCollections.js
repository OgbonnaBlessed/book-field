import React, { useState, useEffect } from 'react'
import './NewCollections.css'
// import {product} from '../../Data/Data'
import Item from '../Item/Item'

const NewCollections = () => {
    // const fantasy = product.filter(product => product.category.includes('New Collections'));
    const [newcollection, setNewcollection] = useState([]);

    useEffect(() => {
      fetch('http://localhost:4000/newcollection')
      .then((res) => res.json())
      .then((data) => setNewcollection(data));
    }, []);

  return (
    <div className='new'>
      <div className="heading">
        <div className="line1"></div>
        <h1>Explore New Collections</h1>
        <div className="line2"></div>
      </div>
      <div className="new-item">
        {newcollection.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} author={item.author} priceCents={item.priceCents} image={item.image} /> 
        })}
      </div>
    </div>
  )
}

export default NewCollections
