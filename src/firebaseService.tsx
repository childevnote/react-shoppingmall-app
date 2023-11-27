import { User as FirebaseUser, GoogleAuthProvider, User, onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase, createUserWithEmailAndPassword as createUserWithEmailAndPasswordFirebase } from 'firebase/auth';
import {  doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { auth, db } from './firebase-config';


export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Google 로그인 중 오류 발생:', error);
    throw error;
  }
};

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPasswordFirebase(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('이메일/패스워드 로그인 중 오류 발생:', error);
    throw error;
  }
};

export const createUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const result = await createUserWithEmailAndPasswordFirebase(auth, email, password);
    return result.user;
  } catch (error) {
    console.error('이메일/패스워드 회원가입 중 오류 발생:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('로그아웃 중 오류 발생:', error);
    throw error;
  }
};

export const onAuthStateChangedListener = (callback: (user: User | null) => void) => {
  const unsubscribe = onAuthStateChanged(auth, callback);
  return unsubscribe;
};

export const addUserToFirestore = async (uid: string, userData: any) => {
  try {
    const usersCollection = collection(db, 'users');
    const userRef = doc(usersCollection, uid);
    await setDoc(userRef, userData);
  } catch (error) {
    console.error('Error adding user to Firestore:', error);
  }
};

export const getUserDataFromFirestore = async (uid: string) => {
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      return userDocSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data from Firestore:', error);
    throw error;
  }
};

export type { FirebaseUser };
