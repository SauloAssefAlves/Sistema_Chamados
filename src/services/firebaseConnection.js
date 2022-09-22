import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { ref, uploadString, getStorage } from "firebase/storage";

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
export const storage = getStorage(firebase);

export async function StoreData(collection, uid, data) {
  const db = getFirestore(firebase);
  await setDoc(doc(db, collection, uid), data);
}

export async function getStoreData(collection, uid) {
  const db = getFirestore(firebase);
  const docRef = doc(db, collection, uid);
  return await getDoc(docRef);
}

export async function updateDocs(collection, uid, data) {
  const db = getFirestore(firebase);
  const docRef = doc(db, collection, uid);
  return updateDoc(docRef, data);
}

export async function storeFile(reference, file) {
  const db = getFirestore(firebase);
  return uploadString(ref(db, reference), file, "data_url");
}

// export async function getStorage() {
//   const db = getFirestore(firebase);
//   return db;
// }
export default firebase;
