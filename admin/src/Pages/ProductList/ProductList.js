import React, { useEffect, useState } from 'react'
import './ProductList.css'

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`http://localhost:4000/allproducts`);
            const data = await res.json();

            if (res.ok) {
                setProducts(data);
            }

        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [])

    const handleDelete = async (id) => {
            await fetch('http://localhost:4000/removeproduct', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id })
            })
            await fetchProducts()
    }

  return (
    <div className='product-list-container'>
        <div className="product-list">
            {products.length > 0
           ? <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Product author</th>
                        <th>Product price</th>
                        <th>Product category</th>
                        <th>Product image</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                {products.map((product, i) => (
                    <tbody key={i}>
                        <tr>
                            <td>{product.name}</td>
                            <td>{product.author}</td>
                            <td>{product.priceCents}</td>
                            <td>{product.category}</td>
                            <td>
                                <img src={product.image} alt="" />
                            </td>
                            <td 
                                className='delete'
                                onClick={() => handleDelete(product.id)}>Delete</td>
                        </tr>
                    </tbody>
                ))}
            </table>
            : <p>You have no products yet!</p>
            }
        </div>
    </div>
  )
}

export default ProductList