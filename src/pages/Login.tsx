import React, { useEffect, useState } from 'react';
import { auth } from "../firebase-config";
import { GoogleAuthProvider, User, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Login = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  const handleGoogleLogout = () => {
    auth.signOut()
      .then(() => {
        setUserData(null);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      <h3>구글 로그인 테스트</h3>
      <button onClick={handleGoogleLogin}>로그인</button>
      <button onClick={handleGoogleLogout}>로그아웃</button>
      <h4>로그인하면 아래쪽에 이름이 나타납니다.</h4>
      <div>
        {userData
          ? "당신의 이름은 : " + userData.displayName
          : "로그인 버튼을 눌러주세요 :)"}
      </div>
      <Link to={'/'}><Button>홈으로</Button></Link>
    </div>
  );
};

export default Login;
