import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyASt-hkGfBfRl--3HnlfEYSzJhW6wovhpw",
    authDomain: "ksneaker-eaab8.firebaseapp.com",
    projectId: "ksneaker-eaab8",
    storageBucket: "ksneaker-eaab8.appspot.com",
    messagingSenderId: "1000952380478",
    appId: "1:1000952380478:web:cc8eedafe4984be551256f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storageFirebase = getStorage(app)