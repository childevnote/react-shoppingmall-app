import React, { useState } from 'react'
import Header from '../components/Header';
import '../styles/ProductDetail.css';
import { useParams } from 'react-router-dom';
import { Product } from '../components/types';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [products, setProducts] = useState<Product[]>([]);

  
  return (
    <div className='product-detail'>
      <Header />
      <h2>Product Detail</h2>
      <p>Product ID: {productId }</p>
      {/* 추가적인 상세 정보를 표시 */}
    </div>
  );
}

export default ProductDetail
