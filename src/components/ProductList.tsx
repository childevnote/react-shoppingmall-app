// ProductList.tsx

import React from 'react';
import { Product } from './types';

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  return (
    <div>
      <p>{loading ? 'Loading...' : `Showing ${products.length} items`}</p>
      <div className="product-list">
        {products.map((product) => (
          <a key={product.id} href={`/product/${product.id}`}>
            <div className="products">
              {/* 내용 생략 */}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
