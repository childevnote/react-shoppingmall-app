// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaflmvEkJGIvWt71gX_maxUCLsa7PJ9VA",
  authDomain: "shoppingmall-aa328.firebaseapp.com",
  projectId: "shoppingmall-aa328",
  storageBucket: "shoppingmall-aa328.appspot.com",
  messagingSenderId: "600794396988",
  appId: "1:600794396988:web:352627dd07d31a3b79c639"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth, app };
