import React, { useContext } from 'react'
import './ProductDisplay.css'
import formatCurrency from '../../Utils/Money';
import { BookContext } from '../../Context/BookContext';
import { useNavigate } from 'react-router-dom';

const ProductDisplay = ({ product }) => {
    const { addToCart } = useContext(BookContext);
    const navigate = useNavigate();

  return (
    <div className='product-display-container'>
        <div className="product-display-box">
            <div className="product-display-left">
                <div className="product-display-img-list">
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="product-display-img">
                    <img className='main' src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="product-display-right">
                <div className="product-title">
                    <h2>{product.name} by <i>{product.author}</i></h2>
                </div>
                {/* <div className="product-description">
                    {product.description}
                </div> */}
                {/* <div className="product-display-rating">
                    <div className="product-rating">
                        <img src={product.rating.stars} alt="" />
                    </div>
                    <div className="product-count">
                        {product.rating.count}
                    </div>
                </div> */}
                <div className="product-display-price-box">
                    <div className="price">${formatCurrency(product.priceCents)}</div>
                    {/* {product.discount && <div className='discount'>{product.discount}</div>} */}
                </div>
                <button 
                    type="button" 
                    onClick={() => {
                        if (localStorage.getItem('auth-token')) {
                            addToCart(product.id)
                        } else {
                            navigate('/login')
                        }
                        
                    }}>Add to cart</button>
                <div className="categories">
                <p className='category'>Product categories: {`${product.category}`}</p> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDisplay
