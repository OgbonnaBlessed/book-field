import React, { useContext } from 'react'
import './CartItems.css'
import { BookContext } from '../../Context/BookContext'
import formatCurrency from '../../Utils/Money';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);

const CartItems = () => {
    const { product, cartItems, removeFromCart, getTotalCartAmount, getTotalCartItems } = useContext(BookContext);

    const today = dayjs();
    const date = today.format('dddd, Do MMMM');

    const totalBeforeTax = parseFloat(getTotalCartAmount());
    const estimatedTax = (totalBeforeTax * 0.10).toFixed(2);
    const orderTotal = (totalBeforeTax + parseFloat(estimatedTax)).toFixed(2);
  
    return (
    <>
    <div className="cart-item">
        <div className="cart-display">
            <h1>Review your order</h1>
          <div className="cart-display-container">
            <div className="order-summary">
            {product.map((e) => {
            if (cartItems[e.id] > 0) { // Ensure this uses e.id
            return (
                <div className="sub-item" key={e.id}>
                    <h2>{date}</h2>
                    <div className="product-info">
                        <div className="product-details">
                            <img src={`${e.image}`} alt="" />
                            <div className="product-further-info">
                                <div className="name">{e.name}</div>
                                <div className="price">${formatCurrency(e.priceCents * cartItems[e.id])}</div>
                                <div className="quantity">
                                    <p>Quantity:</p>
                                    <p>{cartItems[e.id]}</p>
                                    <button type='button' className='delete-item' onClick={() => { removeFromCart(e.id) }}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
                }
                    return null; // Return null if item is not in cart
                })}
                </div>

                <div className="payment-summary">
                  <div className="price-outline">
                    <h2>Payment summary</h2>
                    <div className="price-per-quantity">
                      <div className="item-price">
                        <div className="before-tax">
                          <p>Items({getTotalCartItems()}):</p>
                          <p>${totalBeforeTax}</p>
                        </div>
                        <div className="shipping">
                          <p>Shipping & handling:</p>
                          <p>Free</p>
                        </div>
                      </div>
                      <div className="tax-calculation">
                        <div className="total-before-tax">
                          <p>Total before tax:</p>
                          <p>${totalBeforeTax}</p>
                        </div>
                        <div className="estimated">
                          <p>Estimated tax (10%)</p>
                          <p>${estimatedTax}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="place-order">
                    <div className="contain-price-summation">
                      <h3>Order Total:</h3>
                      <h3>${orderTotal}</h3>
                    </div>
                    <button type="button">Place your order</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
    </>
    )
  }
  
  export default CartItems;