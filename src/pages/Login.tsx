import { useEffect, useState } from 'react';
import { signInWithGoogle, onAuthStateChangedListener, FirebaseUser } from '../firebaseService';
import '../styles/Login.css';
import { Box, IconButton, Input } from '@mui/material';

const Login = () => {
  const [userData, setUserData] = useState<FirebaseUser | null>(null);

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

  return (
    <div className='login'>
      <h1>Login</h1>
      <Box
        className='login-form'
        boxShadow={3}
        padding={5}
        borderRadius={10}
      >
        <Input placeholder='Email' type='email' />
        <Input placeholder='Password' type='password' />
        <div className='login_or_register'>
          <button>Login</button>
          <button>Register</button>
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
      </Box>

    </div>
  );
};

export default Login;
