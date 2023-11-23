import { useEffect, useState } from "react";
import { Product } from "./types";
import { onAuthStateChangedListener, FirebaseUser } from "../firebaseService";
import Login from "../pages/Login";
import "../styles/Home.css";
import "../styles/Products.css";

const category = ["all", "electronics", "jewelry", "men's clothing", "women's clothing"];

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);

  const handleChange: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setSelectedValue(e.currentTarget.value);
  };

  const getCategoryUrl = (category: string): string => {
    return category === "all"
      ? "https://fakestoreapi.com/products"
      : `https://fakestoreapi.com/products/category/${category}`;
  };

  const renderButton = (category: string) => (
    <button
      key={category}
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
        setLoading(true);

        const url = getCategoryUrl(selectedValue);
        const response = await fetch(url);
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedValue]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        sessionStorage.removeItem('user');
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="home">
      {user ? (
        <>
          <h1>{user.displayName}, welcome back!</h1>
          <h2>Products</h2>
          <div className="products-buttons">
            {category.map((category) => renderButton(category))}
          </div>
          <p>{loading ? "Loading..." : `showing ${products.length} items`}</p>
          <div className="product-list">
            {products.map((product) => (
              <a key={product.id} href={`/product/${product.id}`}>
                <div className="products">
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
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
