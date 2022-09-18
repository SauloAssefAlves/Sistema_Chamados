import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALBFc8lzGR1P_CSYBR4lF_5RKAwsWhqCo",
  authDomain: "sistemachamados-83999.firebaseapp.com",
  projectId: "sistemachamados-83999",
  storageBucket: "sistemachamados-83999.appspot.com",
  messagingSenderId: "981875880039",
  appId: "1:981875880039:web:946abfd9645bd50b47e4c2",
  measurementId: "G-BQBRYEG32J",
};

const firebase = initializeApp(firebaseConfig);

export async function StoreData(collection, uid, data) {
  console.log(collection, uid, data);
  const db = getFirestore(firebase);

  await setDoc(doc(db, collection, uid), data);
}

export async function getStoreData(collection, uid) {
  const db = getFirestore(firebase);
  const docRef = doc(db, collection, uid);
  return await getDoc(docRef);
}
export default firebase;
