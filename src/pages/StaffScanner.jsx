import React, { useState } from "react";
import { db } from "../services/firebaseConfig";
import { collection, addDoc, doc, updateDoc, increment, serverTimestamp, getDoc } from "firebase/firestore";

const StaffScanner = () => {
  const [simulatedNfcId, setSimulatedNfcId] = useState("");
  const [scanResult, setScanResult] = useState("");

  const handleSimulateScan = async () => {
    try {
      if (!simulatedNfcId) {
        alert("Por favor ingresa un ID NFC simulado.");
        return;
      }

      setScanResult(simulatedNfcId);

      // Guardar escaneo en Firestore
      await addDoc(collection(db, "escaneos"), {
        nfcId: simulatedNfcId,
        timestamp: serverTimestamp()
      });

      // Buscar usuario por NFC ID (vamos a buscar por campo nfcId, no por UID)
      const usuariosRef = collection(db, "usuarios");
      const snapshot = await getDoc(doc(db, "usuarios", simulatedNfcId));

      if (snapshot.exists()) {
        // Si el nfcId coincide con el ID del documento (cuando usas UID como NFC_ID)
        await updateDoc(doc(db, "usuarios", simulatedNfcId), {
          puntos: increment(10)
        });
        alert("Puntos asignados exitosamente 🚀");
      } else {
        alert("No se encontró el usuario con ese NFC ID.");
      }
    } catch (error) {
      console.error("Error en el escaneo simulado:", error);
      alert("Error al simular el escaneo.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Simulador de Escaneo NFC</h2>
      <input
        type="text"
        placeholder="Ingresa el NFC ID"
        value={simulatedNfcId}
        onChange={(e) => setSimulatedNfcId(e.target.value)}
      /><br /><br />
      <button onClick={handleSimulateScan}>Simular Escaneo</button>

      {scanResult && <p>Último escaneo: {scanResult}</p>}
    </div>
  );
};

export default StaffScanner;
