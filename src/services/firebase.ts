import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC3zvyCvAmwYc_aCqwMleYnCnvuXfDb8SQ",
  authDomain: "getirclone-6957a.firebaseapp.com",
  projectId: "getirclone-6957a",
  storageBucket: "getirclone-6957a.appspot.com",
  messagingSenderId: "171815858020",
  appId: "1:171815858020:web:f81efa6637f086755dd471",
  measurementId: "G-KYGJRKVLEB"
};

const FIREBASE_APP = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const FIREBASE_AUTH = getAuth(FIREBASE_APP)

export const auth = () => {
  return FIREBASE_AUTH
}

export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export default firebaseConfig;