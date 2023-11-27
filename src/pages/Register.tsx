import { useState } from 'react';
import { addUserToFirestore, createUserWithEmailAndPassword, } from '../firebaseService';
import '../styles/Login.css';
import BasicModal from '../components/Modal';

interface RegisterProps {
  onBackToLoginClick: () => void;
}

const Register: React.FC<RegisterProps> = ({ onBackToLoginClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState("　");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [name, setName] = useState(''); 
  const [age, setAge] = useState<number | string>('');
  const [gender, setGender] = useState<'male' | 'female'>();
  const [address, setAddress] = useState(''); 

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleEmailPasswordRegistration = async () => {
    if (password !== confirmPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      setIsErrorModalOpen(true);
      return;
    }
    try {
      if (!email || !password || !name) {
        setErrorMsg('이메일, 비밀번호, 이름은 필수 입력 항목입니다.');
        setIsErrorModalOpen(true);
        return;
      }
      const user = await createUserWithEmailAndPassword(email, password);
      await addUserToFirestore(user.uid, {
        name,
        age,
        gender,
        address,
      });
      setEmail("");
      setPassword("");
      setConfirmPassword('');
      setName('');
      setAge('');
      setGender(undefined);
      setAddress('');
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
        case 'auth/email-already-exists':
          setErrorMsg('이미 존재하는 이메일입니다.');
          break;
        case 'auth/weak-password':
          setErrorMsg('비밀번호는 6자리 이상이어야 합니다.');
          break;
        default:
          break;
      }
      setIsErrorModalOpen(true);
    }
  };

  return (
    <div className='register-form'>
    <input placeholder='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
    <input placeholder='New Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
    <input placeholder='Confirm New Password' type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

    <input placeholder='Name' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
    <input placeholder='Age' type='number' value={age} onChange={(e) => setAge(e.target.value)} />


    <div>
      <label>
        <input type='radio' value='male' checked={gender === 'male'} onChange={() => setGender('male')} />
        Male
      </label>
      <label>
        <input type='radio' value='female' checked={gender === 'female'} onChange={() => setGender('female')} />
        Female
      </label>
    </div>

    <input placeholder='Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />

    <div className='login_or_register'>
      <button onClick={handleEmailPasswordRegistration}>Register</button>
      <button onClick={onBackToLoginClick}>Back to Login</button>
    </div>

    {isErrorModalOpen && (
      <BasicModal
        title='Error'
        content={errorMsg}
        handleClose={handleCloseErrorModal}
      />
    )}
  </div>
  );
};

export default Register;
