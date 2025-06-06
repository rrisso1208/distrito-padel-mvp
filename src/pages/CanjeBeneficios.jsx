import React, { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { collection, getDocs, addDoc, doc, getDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";

const CanjeBeneficios = () => {
  const [nfcId, setNfcId] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [beneficios, setBeneficios] = useState([]);

  const buscarUsuario = async () => {
    if (!nfcId) {
      alert("Debes ingresar el NFC ID del usuario.");
      return;
    }

    const userRef = doc(db, "usuarios", nfcId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      setUsuario({ id: userSnap.id, ...userSnap.data() });
      cargarBeneficios();
    } else {
      alert("No se encontró el usuario.");
      setUsuario(null);
    }
  };

  const cargarBeneficios = async () => {
    const snapshot = await getDocs(collection(db, "beneficios"));
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBeneficios(lista);
  };

  const canjear = async (beneficio) => {
    if (!usuario) return;

    if ((usuario.puntos || 0) < beneficio.puntosRequeridos) {
      alert("No tiene suficientes puntos para este canje.");
      return;
    }

    // Restar puntos al usuario
    const userRef = doc(db, "usuarios", usuario.id);
    await updateDoc(userRef, {
      puntos: increment(-beneficio.puntosRequeridos)
    });

    // Guardar el canje en la colección de canjes
    await addDoc(collection(db, "canjes"), {
      usuarioId: usuario.id,
      beneficioId: beneficio.id,
      beneficioNombre: beneficio.nombre,
      puntosGastados: beneficio.puntosRequeridos,
      fecha: serverTimestamp()
    });

    alert("Canje exitoso 🚀");

    // Actualizar los datos del usuario en pantalla
    buscarUsuario();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Canje de Beneficios</h2>

      <input
        placeholder="Ingrese NFC ID"
        value={nfcId}
        onChange={(e) => setNfcId(e.target.value)}
      />
      <button onClick={buscarUsuario}>Buscar</button>

      {usuario && (
        <>
          <h3>Usuario: {usuario.name} — Puntos: {usuario.puntos || 0}</h3>

          <h3>Beneficios disponibles:</h3>
          <ul>
            {beneficios.map((b) => (
              <li key={b.id}>
                {b.nombre} - {b.puntosRequeridos} puntos
                <button onClick={() => canjear(b)}>Canjear</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CanjeBeneficios;
