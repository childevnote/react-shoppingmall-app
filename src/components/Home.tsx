import { useEffect, useState } from "react";
import { Product } from "./types";
import "../styles/Home.css";
import "../styles/Products.css";

const category = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"]

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태를 추적

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
    console.log(e.target.value);
  };

  const getCategoryUrl = (category: string): string => {
    return category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;
  };

  const renderButton = (category: string) => (
    <button
      value={category}
      onClick={handleChange}
      style={{ backgroundColor: `${selectedValue === category ? "gray" : ""}` }}
    >
      {category}
    </button>
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts([]);
        setLoading(true); // 데이터 로딩 중 상태로 설정

        const url = getCategoryUrl(selectedValue);
        const response = await fetch(url);
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // 데이터 로딩이 완료되면 로딩 상태 해제
      }
    };

    fetchProducts();
  }, [selectedValue]);

  return (
    <div className="home">
      <h1>Products</h1>
      <div className="products-buttons">
        {category.map((category) => renderButton(category))}
      </div>
      <p>{loading ? "Loading..." : `showing ${products.length} items`}</p>
      <div className="product-list">
        {products.map((product) => (
          <a href={`/product/${product.id}`}>
            <div key={product.id} className="products">
              <img src={product.image} alt={product.title} />
              <h3>{truncate(product.title, 20)}</h3>
              <div className="product-price">
                <button id={product.title} className="addCartBtn">Add to Cart</button>
                <p>$ {product.price}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}