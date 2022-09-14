import { initializeApp } from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyALBFc8lzGR1P_CSYBR4lF_5RKAwsWhqCo",
  authDomain: "sistemachamados-83999.firebaseapp.com",
  projectId: "sistemachamados-83999",
  storageBucket: "sistemachamados-83999.appspot.com",
  messagingSenderId: "981875880039",
  appId: "1:981875880039:web:946abfd9645bd50b47e4c2",
  measurementId: "G-BQBRYEG32J",
};

console.log(initializeApp.length);
const firebase = initializeApp(firebaseConfig);

export default firebase;
