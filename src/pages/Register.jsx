import React, { useState } from "react";
import { auth, db } from "../services/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Register = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    phone: "",
    nfcId: "",
    rol: "usuario"
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await setDoc(doc(db, "usuarios", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        nfcId: formData.nfcId,
        rol: formData.rol,
        puntos: 0,
        createdAt: serverTimestamp()
      });

      alert("Registro exitoso 🚀");

      // Limpia el formulario completo, manteniendo el rol seleccionado
      setFormData({
        ...initialFormData,
        rol: formData.rol
      });

    } catch (error) {
      console.error(error);
      alert("Error en el registro: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Registro Distrito Pass</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required /><br />
        <input name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} /><br />
        <input name="nfcId" placeholder="ID de Tarjeta NFC" value={formData.nfcId} onChange={handleChange} /><br />

        <label>Rol: </label>
        <select name="rol" value={formData.rol} onChange={handleChange}>
          <option value="usuario">Usuario</option>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select><br /><br />

        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
};

export default Register;
