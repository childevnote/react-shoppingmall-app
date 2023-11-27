import { useEffect, useState } from 'react';
import '../styles/Header.css';
import { FirebaseUser, onAuthStateChangedListener, signOutUser } from '../firebaseService';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [userData, setUserData] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogout = async () => {
    try {
      await signOutUser();
      setUserData(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        sessionStorage.setItem('user', JSON.stringify(user));
        setUserData(user);
      } else {
        sessionStorage.removeItem('user');
        setUserData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = prevScrollPos < currentScrollPos;
      setPrevScrollPos(currentScrollPos);
      setVisible(!isScrolledDown || currentScrollPos < 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  const handleMyPageButton = () => {
    navigate('/my-page');
  }

  return (
    <div className={`header ${visible ? 'visible' : 'hidden'}`}>
      <Link to={"/"}><h2>Shop</h2></Link>
      <div className="header-buttons">
        {userData ?
          <><button>Cart</button>
            <button onClick={handleMyPageButton}>MyPage</button>
            <button onClick={handleGoogleLogout}>Logout</button>
          </> : <button>Login required</button>}
      </div>
    </div>
  );
}
