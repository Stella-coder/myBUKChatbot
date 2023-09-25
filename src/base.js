// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5ON8PGwRMSH5-KTHXZp7HzzvPl-YmxYM",
  authDomain: "complain-submission.firebaseapp.com",
  projectId: "complain-submission",
  storageBucket: "complain-submission.appspot.com",
  messagingSenderId: "753181858548",
  appId: "1:753181858548:web:f2d281b151516c8c9c5ca1"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export default app