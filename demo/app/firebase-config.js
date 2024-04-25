
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAcHm2BGIGRO1nSSZCnqKsFzG6A2cO_B2g",
  authDomain: "react-sample-cc64d.firebaseapp.com",
  databaseURL: "https://react-sample-cc64d-default-rtdb.firebaseio.com",
  projectId: "react-sample-cc64d",
  storageBucket: "react-sample-cc64d.appspot.com",
  messagingSenderId: "91371227457",
  appId: "1:91371227457:web:cd4f03be95ea841cd279c0",
  measurementId: "G-DE5W8HRQKN"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };