import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase proporcionada por Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB8ps4GVwPai46Npris5czgVKOzEN3GEAY",
  authDomain: "free-market-f7cfb.firebaseapp.com",
  projectId: "free-market-f7cfb",
  storageBucket: "free-market-f7cfb.firebasestorage.app",
  messagingSenderId: "435528590467",
  appId: "1:435528590467:web:033a4b1a11c4ca3182e7b6"

  /*
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
  */
  /*
  VITE_API_KEY= "AIzaSyB8ps4GVwPai46Npris5czgVKOzEN3GEAY"
  VITE_AUTH_DOMAIN= "free-market-f7cfb.firebaseapp.com"
  VITE_PROJECT_ID= "free-market-f7cfb"
  VITE_STORAGE_BUCKET= "free-market-f7cfb.firebasestorage.app"
  VITE_MESSAGING_SENDER_ID= "435528590467"
  VITE_APP_ID= "1:435528590467:web:033a4b1a11c4ca3182e7b6"
  */
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

// Log para validar la conexión a la base de datos
console.log("Conexión a Firestore establecida:", db);

export {db};
