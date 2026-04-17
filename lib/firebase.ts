import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiCgjebHbErv6pDFD31gwPf86OHfVAyd0",
  authDomain: "terror-indica.firebaseapp.com",
  projectId: "terror-indica",
  storageBucket: "terror-indica.appspot.com", // ✅ CORRIGIDO
  messagingSenderId: "1022491608163",
  appId: "1:1022491608163:web:a51a5a9cab7dc7180da456",
  measurementId: "G-XVYRJNLYYQ"
};

const app = initializeApp(firebaseConfig);

// ✅ ESSENCIAL
export const auth = getAuth(app);