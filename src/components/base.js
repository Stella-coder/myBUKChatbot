// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Mju9bnETnARmQRcrvVco_2N936tIR9U",
  authDomain: "buk-gear-chatbot.firebaseapp.com",
  projectId: "buk-gear-chatbot",
  storageBucket: "buk-gear-chatbot.appspot.com",
  messagingSenderId: "578770552179",
  appId: "1:578770552179:web:7dff7729fcdc255aed3106"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export default app