import { useEffect, useState } from 'react'
import { Product } from './types';
import '../styles/Home.css'

export default function Home() {

  const [selectedValue, setSelectedValue] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
  };

  const getCategoryUrl = (category: string): string => {
    return category === 'all' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;
  };

  const renderButton = (category: string) => (
    <button
      value={category}
      onClick={handleChange}
      style={{ backgroundColor: `${selectedValue === category ? 'gray' : ''}` }}
    >
      {category}
    </button>
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = getCategoryUrl(selectedValue);
        const response = await fetch(url);
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [selectedValue]);

  return (
    <div>
      <h1>Products</h1>
      <div className="products-buttons">
        {renderButton('all')}
        {renderButton('electronics')}
        {renderButton('jewelery')}
        {renderButton("men's clothing")}
        {renderButton("women's clothing")}
      </div>
      <div className="product-list">
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <img
                src={product.image}
                alt={product.title}
              />
              <h3>{product.title}</h3>
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}
