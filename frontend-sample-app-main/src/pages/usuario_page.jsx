import React, { useState, useEffect } from "react";
import PerfilUsuario from "../components/PerfilUsuario";
import avatar from "../assets/no_foto.jpg";

const UsuarioPage = () => {
  const [reservas, setReservas] = useState([]);
  const [usuario, setUsuario] = useState({
    nombre: "Juan Pérez",
    correo: "juan.perez@example.com",
    imagen: avatar, // Cambiar a una imagen real
  });

  const today = new Date();
  let returnDate = new Date();
  returnDate.setDate(today.getDate() + 7);

  if (returnDate.getDay() === 6) {
    returnDate.setDate(returnDate.getDate() + 2);
  } else if (returnDate.getDay() === 0) {
    returnDate.setDate(returnDate.getDate() + 1);
  }


  useEffect(() => {
    const reservasGuardadas = JSON.parse(localStorage.getItem("reservas")) || [];
    setReservas(reservasGuardadas);
  }, []);

  const handleCancel = (id) => {
    const nuevasReservas = reservas.filter((reserva) => reserva.id !== id);
    setReservas(nuevasReservas);
    localStorage.setItem("reservas", JSON.stringify(nuevasReservas));
  };

  const uniqueReservas = Array.from(new Set(reservas.map((reserva) => reserva.id)))
    .map((id) => reservas.find((reserva) => reserva.id === id));

  return (
    <div className="usuario-page">
      <h1>Mis Reservas</h1>
    <hr />
      <div className="usuario-contenido">
        <PerfilUsuario usuario={usuario} />
        <div className="reservas-lista">
          {uniqueReservas.length === 0 ? (
            <p>No has reservado ningún libro ni sala todavía.</p>
          ) : (
            uniqueReservas.map((reserva) => (
              <div key={reserva.id} className="reserva-card">
                <img src={reserva.imagen} alt={reserva.nombre} />
                <div className="reserva-info">
                  <h3>{reserva.nombre}</h3>
                  <p>
                    Autor: <strong>{reserva.autor}</strong>
                  </p>
                  <p>Fecha de Retiro: {today.toLocaleDateString()}</p>
                  <p>Fecha de Devolución: {returnDate.toLocaleDateString()}</p>
                </div>
                <button onClick={() => handleCancel(reserva.id)}>Cancelar Reserva</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UsuarioPage;
