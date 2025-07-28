// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMAxLSTvE5HzFI32OKr4zHAOMKT32bnWA",
  authDomain: "w6-24-react-gna-nikita-tiffin.firebaseapp.com",
  projectId: "w6-24-react-gna-nikita-tiffin",
  storageBucket: "w6-24-react-gna-nikita-tiffin.appspot.com",
  messagingSenderId: "28974720752",
  appId: "1:28974720752:web:ff46cc600259d32e0b0435",
  measurementId: "G-20YMVRR9D1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
