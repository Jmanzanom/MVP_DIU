import React, { useState, useEffect } from "react";
import Catalogo from "../components/Catalogo";

const CatalogoPage = () => {
  const [reservas, setReservas] = useState([]);

  // Cargar reservas desde localStorage al inicio
  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(reservasGuardadas);
  }, []);

  const handleReserve = (libro) => {
    const nuevasReservas = [...reservas, libro];
    setReservas(nuevasReservas); // Actualizar el estado de reservas
    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
  };

  return (
    <div className="catalogo-page">
      <h1 className="catalogo-title">Catálogo de Libros</h1>
      <hr />
      <Catalogo reservas={reservas} onReserve={handleReserve} />
    </div>
  );
};

export default CatalogoPage;
