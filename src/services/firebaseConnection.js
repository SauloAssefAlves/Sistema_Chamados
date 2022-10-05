import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  collection,
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
const db = getFirestore(firebase);
export const storage = getStorage(firebase);

export async function StoreData(collection, uid, data) {
  await setDoc(doc(db, collection, uid), data);
}

export async function getStoreData(collection, uid) {
  const docRef = doc(db, collection, uid);
  return await getDoc(docRef);
}

export async function updateDocs(collection, uid, data) {
  const docRef = doc(db, collection, uid);
  return updateDoc(docRef, data);
}

export async function storeFile(reference, file) {
  return uploadString(ref(db, reference), file, "data_url");
}

export async function getCollection(collect) {
  const array = [];
  const q = query(collection(db, collect));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    array.push({ id: doc.id, ...doc.data() });
  });

  return array;
}

// export async function getStorage() {
//   const db = getFirestore(firebase);
//   return db;
// }
export default firebase;
