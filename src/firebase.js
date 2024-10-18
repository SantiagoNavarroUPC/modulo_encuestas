import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAzrfhuzzVrQE58UHMnPhqqFIl01KqYt-o",
    authDomain: "modulo-encuesta.firebaseapp.com",
    projectId: "modulo-encuesta",
    storageBucket: "modulo-encuesta.appspot.com",
    messagingSenderId: "89241113104",
    appId: "1:89241113104:web:8d8ecba9e21909a6e97095"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };