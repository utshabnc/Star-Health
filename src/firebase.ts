import firebase, { initializeApp } from 'firebase/app';
import 'firebase/auth';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as fbSignOut,
} from 'firebase/auth';

var firebaseConfig = {
  apiKey: 'AIzaSyCk9fSZs-1XeEXl8ll5NuvirSjODXx3zes',
  authDomain: 'starhealth-io.firebaseapp.com',
  projectId: 'starhealth-io',
  storageBucket: 'starhealth-io.appspot.com',
  messagingSenderId: '754350085305',
  appId: '1:754350085305:web:b4085871dfe80cbe267768',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signIn = () => signInWithRedirect(auth, new GoogleAuthProvider());
export const signOut = () => fbSignOut(auth);
