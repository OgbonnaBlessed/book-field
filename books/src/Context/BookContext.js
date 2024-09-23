import React, { createContext, useState } from "react";
import { product } from '../Data/Data'
import formatCurrency from "../Utils/Money";

export const BookContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < product.length; index++) {
        cart[product[index].id] = 0;
    }

    return cart;
}

const BookContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId] + 1 }))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
          if (prev[itemId] > 0) {
            return { ...prev, [itemId]: prev[itemId] - 1 };
          }
          return prev;
        });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = product.find((product) => product.id === itemId);
                // if (itemInfo) { // Ensure itemInfo is not undefined
                    totalAmount += formatCurrency(itemInfo.priceCents) * cartItems[itemId]; // Divide by 100 to convert cents to dollars
                // }
            }
        }
    
        return totalAmount.toFixed(2); // Ensure two decimal places
    };

    const getTotalCartItems = () => {
        let totalItems = 0;

        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                totalItems += cartItems[itemId];
            }
        }

        return totalItems;
    }

    
    const contextValue = { product, cartItems, addToCart, removeFromCart, getTotalCartAmount, getTotalCartItems }

    return (
        <BookContext.Provider value={contextValue}>
            {props.children}
        </BookContext.Provider>
    )
}
export default BookContextProvider