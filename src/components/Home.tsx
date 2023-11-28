import { useEffect, useState } from "react";
import { Product } from "./types";
import { onAuthStateChangedListener, FirebaseUser, getUserDataFromFirestore } from "../firebaseService";
import Login from "../pages/Login";
import ProductList from "./ProductList";
import "../styles/Home.css";
import "../styles/Products.css";

const category = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

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
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        const userDataFromFirestore = await getUserDataFromFirestore(user.uid);
        setUserData(userDataFromFirestore);
      } else {
        sessionStorage.removeItem('user');
        setUser(null);
        setUserData(null);
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
          <h1>{user.displayName || (userData?.name ? userData.name : '')}, welcome back!</h1>
          <h2>Products</h2>
          <div className="products-buttons">
            {category.map((category) => renderButton(category))}
          </div>
          <ProductList products={products} loading={loading} />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}
