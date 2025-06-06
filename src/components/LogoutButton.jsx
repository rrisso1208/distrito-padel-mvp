import React from "react";
import { auth } from "../services/firebaseConfig";
import { signOut } from "firebase/auth";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Sesión cerrada");
  };

  return (
    <button onClick={handleLogout}>Cerrar Sesión</button>
  );
};

export default LogoutButton;
