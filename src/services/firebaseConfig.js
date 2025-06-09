// src/services/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/*
// 🔐 AQUI debes poner tu propia configuración de tu proyecto Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyCuCbrMdbX9173GdiQ2qlYVlrZUUhQZvLM",
  authDomain: "distrito-pass.firebaseapp.com",
  projectId: "distrito-pass",
  storageBucket: "distrito-pass.firebasestorage.app",
  messagingSenderId: "812806185767",
  appId: "1:812806185767:web:eb6a4d8ba08a6b9b3b7f02"
};*/

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
