import React from 'react'

const ProductDetail = ({ id }: { id: any }) => {
  console.log(id);
  const productId = id;
  return (
    <div>
      <h2>Product Detail</h2>
      <p>Product ID: {productId}</p>
      {/* 추가적인 상세 정보를 표시 */}
    </div>
  );
}

export default ProductDetail
