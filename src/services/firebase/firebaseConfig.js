import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC59Yo_yDtEZVE9cSpRoin5GV9wNkNZqkM",
  authDomain: "fighter-suplementos.firebaseapp.com",
  projectId: "fighter-suplementos",
  storageBucket: "fighter-suplementos.appspot.com",
  messagingSenderId: "118312733678",
  appId: "1:118312733678:web:cd5a55eed936608623dcff"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)