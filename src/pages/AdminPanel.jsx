import React, { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AdminPanel = () => {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    const usuariosRef = collection(db, "usuarios");
    const snapshot = await getDocs(usuariosRef);

    const listaUsuarios = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setUsuarios(listaUsuarios);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Admin Panel - Lista de Usuarios</h2>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>UID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Puntos</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
              <td>{usuario.phone}</td>
              <td>{usuario.puntos || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
