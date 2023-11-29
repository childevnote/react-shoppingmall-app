import { useEffect, useState } from 'react';
import { FirebaseUser, getUserDataFromFirestore, onAuthStateChangedListener } from '../firebaseService';
import '../styles/Mypage.css';
import Header from '../components/Header';

const MyPage = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<any | null>(null);

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
    <div className="my-page-container">
      <Header />
      <h1>My Page</h1>
      {user?.displayName && (
        <div className="user-data-container">
          <p>Name: {user.displayName}</p>
          {/* Render other user-specific data */}
        </div>
      )}
      {userData && (
        <div className="user-data-container">
          <p>Name: {userData.name}</p>
          <p>Age: {userData.age}</p>
          <p>Gender: {userData.gender}</p>
          <p>Address: {userData.address}</p>
        </div>
      )}
    </div>
  );
};


export default MyPage;
