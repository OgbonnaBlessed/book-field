import React, { useContext } from 'react'
import { BookContext } from '../Context/BookContext'
import { useParams } from 'react-router-dom';
import Breadcrumb from '../Components/Breadcrumb/Breadcrumb';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import './CSS/Product.css'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { product } = useContext(BookContext);
  const { productId } = useParams();
  const item = product.find((e) => e.id === productId);

  return (
    <div className='Product'>
      <Breadcrumb product={item} />
      <ProductDisplay product={item} />
      <RelatedProducts product={item} />
    </div>
  )
}

export default Product
