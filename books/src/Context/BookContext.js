import React, { createContext, useEffect, useState } from "react";
import formatCurrency from "../Utils/Money";

export const BookContext = createContext(null);

const BookContextProvider = (props) => {
    const [product, setProduct] = useState([]);

    const getDefaultCart = () => {
        let cart = {};
        // for (let index = 0; index < 300 + 1; index++) {
        //     cart[product.id] = 0;
        // }

        product.forEach(item => {
            cart[item.id] = 0;
        })
    
        return cart;
    }
    
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
        .then((response) => response.json())
        .then((data) => {
            setProduct(data);
            // setCartItems(getDefaultCart());  // Set cart after product data is available
        });

        if (localStorage.getItem("auth-token")) {
            fetch('http://localhost:4000/getcartitems', {
                method: 'POST',
                headers: {
                    accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((res) => res.json())
            .then((data) => setCartItems(data));
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addToCart = (itemId) => {
        const updatedQuantity = cartItems[itemId] + 1 || 1;
        setCartItems((prev) => ({ ...prev, [itemId]: updatedQuantity }));
    
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, quantity: updatedQuantity })  // Send updated quantity
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch(err => console.error("Error adding to cart:", err));
        } 
    };

    const removeFromCart = (itemId) => {
        const updatedQuantity = cartItems[itemId] - 1 || 0;

        setCartItems((prev) => {
          if (prev[itemId] > 0) {
            return { ...prev, [itemId]: prev[itemId] - 1 };
          }
          return prev;
        });

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId, quantity: updatedQuantity })  // Send updated quantity
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch(err => console.error("Error adding to cart:", err));
        } 
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
    
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                let itemInfo = product.find((product) => product.id === Number(itemId));
                totalAmount += formatCurrency(itemInfo.priceCents) * cartItems[itemId]; // Divide by 100 to convert cents to dollars
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