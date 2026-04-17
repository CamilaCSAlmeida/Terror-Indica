import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "SAIzaSyCiCgjebHbErv6pDFD31gwPf86OHfVAyd0",
  authDomain: "terror-indica.firebaseapp.com",
  projectId: "terror-indica",
  storageBucket: "terror-indica.firebasestorage.app",
  messagingSenderId: "1022491608163",
  appId: "1:1022491608163:web:9c05fe9e1b2b77650da456"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);