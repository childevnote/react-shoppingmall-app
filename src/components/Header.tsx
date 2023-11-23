import { useEffect, useState } from 'react';
import '../styles/Header.css';
import { FirebaseUser, onAuthStateChangedListener, signOutUser } from '../firebaseService';

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [userData, setUserData] = useState<FirebaseUser | null>(null);

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

      setVisible(!isScrolledDown || currentScrollPos < 10); // 스크롤이 최상단에 위치하면 항상 보이도록 설정
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={`header ${visible ? 'visible' : 'hidden'}`}>
      <h2>Shop</h2>
      <div className="header-buttons">
        {userData ?
          <><button>Cart</button>
            <button>MyPage</button>
            <button onClick={handleGoogleLogout}>Logout</button>
            </> : <button>Login required</button>}
      </div>
    </div>
  );
}
