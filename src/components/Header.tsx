import React, { useEffect, useState } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

export default function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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
        <button>Cart</button>
        <button>MyPage</button>
        <button><Link to={'/login'}>Login</Link></button>
      </div>
    </div>
  );
}
