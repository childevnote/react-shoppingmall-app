import React from 'react';
import { ProductProps } from './types';

const Products: React.FC<ProductProps> = (products) => {
  return (
    <div className="product-list">
      {/* <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Products;
