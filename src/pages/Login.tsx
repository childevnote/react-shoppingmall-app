/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { signInWithGoogle, onAuthStateChangedListener, FirebaseUser, signInWithEmailAndPassword } from '../firebaseService';
import { Box, IconButton } from '@mui/material';
import Register from './Register';
import '../styles/Login.css';
import BasicModal from '../components/Modal';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState<FirebaseUser | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState("　");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);


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
      console.error(error);
      setErrorMsg((error as Error).toString());
      setIsErrorModalOpen(true);
    }
  };

  const handleEmailPasswordLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(email, password);
      setUserData(user);
    } catch (error) {
      console.error(error);
      setErrorMsg("인증에 실패했습니다.");
      switch ((error as any).code) {
        case 'auth/invalid-email':
          setErrorMsg('유효하지 않은 이메일 주소입니다.');
          break;
        case 'auth/wrong-password':
          setErrorMsg('잘못된 비밀번호입니다.');
          break;
        case 'auth/invalid-login-credentials':
          setErrorMsg('존재하지 않는 사용자입니다.');
          break;
        case 'auth/missing-password':
          setErrorMsg('비밀번호를 입력해주세요.');
          break;
        default:
          break;
      }
      setIsErrorModalOpen(true);
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleBackToLoginClick = () => {
    setShowRegister(false);
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className='login'>
      <h1>{showRegister ? 'Register' : 'Login'}</h1>
      <Box
        className='login-form'
        boxShadow={3}
        padding={5}
        borderRadius={10}
      >
        {!showRegister && (
          <>
            <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className='login_or_register'>
              <button onClick={handleEmailPasswordLogin}>Login</button>
              <button onClick={handleRegisterClick}>Go to Register</button>
            </div>
            <div className='divider'>
              <span>OR</span>
            </div>
            <IconButton
              id='google-login-button'
              onClick={handleGoogleLogin}
              size="medium"
            >
              <img
                src='/assets/googlesignin.png'
                alt='Google Login'
                style={{ width: 'inherit', height: 'inherit' }}
              />
            </IconButton>
          </>
        )}

        {showRegister && <Register onBackToLoginClick={handleBackToLoginClick} />}
        {isErrorModalOpen && (
          <BasicModal
            title="Error"
            content={errorMsg}
            handleClose={handleCloseErrorModal}
          />
        )}
      </Box>
    </div>
  );
};

export default Login;