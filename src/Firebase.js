import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAHA6IBaz-YXro8UbRMlFI_zwr2qhixxeY",
    authDomain: "movie-77115.firebaseapp.com",
    projectId: "movie-77115",
    storageBucket: "movie-77115.appspot.com",
    messagingSenderId: "545929781614",
    appId: "1:545929781614:web:1aa93a50169a4283e5617f",
    measurementId: "G-F8RGHNWGKR"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app)