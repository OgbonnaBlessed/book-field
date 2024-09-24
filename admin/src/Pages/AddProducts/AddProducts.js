import React, { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import './AddProducts.css'

const AddProducts = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        priceCent: "",
        category: "Trending",
        image: ""
    })

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value});
    }

    const addProduct = async () => {

        let responseData;
        let product = productDetails;
        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                accept: 'application/json',
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data});

        if (responseData.success) {
            product.image = responseData.image_url;
            await fetch('http://localhost:4000/addproduct', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((res) => res.json()).then((data) => {
                data.success ? alert("Product added") : alert("Failed")
            })
        }
    }
  return (
    <div className="add-product-container">
        <div className='add-product'>
            <div className="input-fields">
                <div className="input-container">
                    <p>Product Title</p>
                    <input 
                        type="text" 
                        name='name' 
                        onChange={changeHandler}
                        value={productDetails.name}
                    />
                </div>
                <div className="input-container">
                    <p>Product Price</p>
                    <input 
                        type="text" 
                        name='priceCent' 
                        value={productDetails.priceCent}
                        onChange={changeHandler}
                    />
                </div>
                <div className="input-container">
                    <p>Product Category</p>
                    <select 
                        name="category"
                        value={productDetails.category}
                        onChange={changeHandler}>
                        <option value="Trending">Trending</option>
                        <option value="Today's Deals">Today's Deals</option>
                        <option value="Popular">Popular</option>
                        <option value="Best Sellers">Best Sellers</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>
                </div>
            </div>
            <div className="upload-field">
                <label htmlFor="file-input">
                    {image 
                  ? <img 
                        src={URL.createObjectURL(image)} 
                        alt="" 
                        className='uploaded-image'
                    />
                  : <AiOutlineCloudUpload 
                        size={50}
                        className='upload-icon'/>
                    } 
                </label>
                <input 
                    type="file" 
                    accept="image/*" 
                    id="file-input" 
                    hidden
                    onChange={imageHandler}
                />
            </div>
        </div>
        <button 
            onClick={addProduct}
            className="add-button">
            Add Product
        </button>
    </div>
  )
}

export default AddProducts
