import React from 'react'
import './Offer.css'

const Offer = () => {
  return (
    <div className='offers'>
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>ONLY ON BEST SELLERS PRODUCT</p>
        <button type="button">Check now</button>
      </div>
      <div className="offers-right">
      <img src={`${process.env.PUBLIC_URL}/images/Best sellers/view16.jpg`} alt="" />
      </div>
    </div>
  )
}

export default Offer
