import React from 'react'
import Header from '../components/Header';

const ProductDetail = ({ id }: { id: any }) => {
  console.log(id);
  const productId = id;
  return (
    <div>
      <Header />
      <h2>Product Detail</h2>
      <p>Product ID: {productId}</p>
      {/* 추가적인 상세 정보를 표시 */}
    </div>
  );
}

export default ProductDetail
