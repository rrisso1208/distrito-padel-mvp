import React, { useState, useEffect } from "react";
import { db } from "../services/firebaseConfig";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

const BeneficiosManager = () => {
  const [nombre, setNombre] = useState("");
  const [puntosRequeridos, setPuntosRequeridos] = useState("");
  const [beneficios, setBeneficios] = useState([]);

  const agregarBeneficio = async () => {
    if (!nombre || !puntosRequeridos) {
      alert("Completa todos los campos");
      return;
    }

    await addDoc(collection(db, "beneficios"), {
      nombre,
      puntosRequeridos: parseInt(puntosRequeridos),
    });

    setNombre("");
    setPuntosRequeridos("");
    cargarBeneficios();
  };

  const cargarBeneficios = async () => {
    const snapshot = await getDocs(collection(db, "beneficios"));
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setBeneficios(lista);
  };

  const eliminarBeneficio = async (id) => {
    await deleteDoc(doc(db, "beneficios", id));
    cargarBeneficios();
  };

  useEffect(() => {
    cargarBeneficios();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "50px auto" }}>
      <h2>Gestión de Beneficios</h2>

      <input placeholder="Nombre beneficio" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input placeholder="Puntos requeridos" type="number" value={puntosRequeridos} onChange={(e) => setPuntosRequeridos(e.target.value)} />
      <button onClick={agregarBeneficio}>Agregar</button>

      <h3>Beneficios creados:</h3>
      <ul>
        {beneficios.map((b) => (
          <li key={b.id}>
            {b.nombre} - {b.puntosRequeridos} puntos
            <button onClick={() => eliminarBeneficio(b.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeneficiosManager;
