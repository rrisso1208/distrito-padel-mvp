// src/services/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔐 AQUI debes poner tu propia configuración de tu proyecto Firebase:
const firebaseConfig = {
  apiKey: "AIzaSyCuCbrMdbX9173GdiQ2qlYVlrZUUhQZvLM",
  authDomain: "distrito-pass.firebaseapp.com",
  projectId: "distrito-pass",
  storageBucket: "distrito-pass.firebasestorage.app",
  messagingSenderId: "812806185767",
  appId: "1:812806185767:web:eb6a4d8ba08a6b9b3b7f02"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
