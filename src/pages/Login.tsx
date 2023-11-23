// Login.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { signInWithGoogle, signOutUser, onAuthStateChangedListener, FirebaseUser } from '../firebaseService';

const Login = () => {
  const [userData, setUserData] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogout = async () => {
    try {
      await signOutUser();
      setUserData(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>구글 로그인 테스트</h3>
      <button onClick={handleGoogleLogin}>로그인</button>
      <button onClick={handleGoogleLogout}>로그아웃</button>
      <h4>로그인하면 아래쪽에 이름이 나타납니다.</h4>
      <div>
        {userData
          ? `당신의 이름은: ${userData.displayName}`
          : '로그인 버튼을 눌러주세요 :)'}
      </div>
      <Link to={'/'}><Button>홈으로</Button></Link>
    </div>
  );
};

export default Login;
