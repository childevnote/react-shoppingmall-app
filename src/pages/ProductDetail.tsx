import React from 'react'
import Header from '../components/Header';
import '../styles/ProductDetail.css';

const ProductDetail = ({ id }: { id: any }) => {
  console.log(id);
  const productId = id;
  return (
    <div className='product-detail'>
      <Header />
      <h2>Product Detail</h2>
      <p>Product ID: {productId}</p>
      {/* 추가적인 상세 정보를 표시 */}
    </div>
  );
}

export default ProductDetail
