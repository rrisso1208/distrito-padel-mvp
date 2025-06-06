import React, { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { collection, query, where, getDocs, doc, getDoc, orderBy } from "firebase/firestore";

const Dashboard = () => {
  const [nfcId, setNfcId] = useState("");
  const [userData, setUserData] = useState(null);
  const [escaneos, setEscaneos] = useState([]);

  const handleSearch = async () => {
    if (!nfcId) {
      alert("Debes ingresar el NFC ID del usuario.");
      return;
    }

    // Consultar datos del usuario
    const userRef = doc(db, "usuarios", nfcId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUserData(userSnap.data());

      // Consultar historial de escaneos
      const escaneosRef = collection(db, "escaneos");
      const q = query(escaneosRef, where("nfcId", "==", nfcId), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);

      const escaneosList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setEscaneos(escaneosList);
    } else {
      setUserData(null);
      setEscaneos([]);
      alert("No se encontró el usuario.");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto" }}>
      <h2>Dashboard Usuario</h2>

      <input
        type="text"
        placeholder="Ingrese NFC ID"
        value={nfcId}
        onChange={(e) => setNfcId(e.target.value)}
      /><br /><br />

      <button onClick={handleSearch}>Buscar</button>

      {userData && (
        <>
          <h3>Datos del Usuario:</h3>
          <p><b>Nombre:</b> {userData.name}</p>
          <p><b>Email:</b> {userData.email}</p>
          <p><b>Teléfono:</b> {userData.phone}</p>
          <p><b>Puntos:</b> {userData.puntos || 0}</p>

          <h3>Historial de Escaneos:</h3>
          {escaneos.length > 0 ? (
            <ul>
              {escaneos.map((scan) => (
                <li key={scan.id}>{scan.timestamp?.toDate().toLocaleString()}</li>
              ))}
            </ul>
          ) : (
            <p>Sin escaneos registrados.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Dashboard;
