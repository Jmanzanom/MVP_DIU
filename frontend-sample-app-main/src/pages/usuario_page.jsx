import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import PerfilUsuario from "../components/PerfilUsuario";
import avatar from "../assets/no_foto.jpg";

const UsuarioPage = () => {
  const [reservas, setReservas] = useState([]);
  const [usuario, setUsuario] = useState({
    nombre: "Juan Pérez",
    correo: "juan.perez@usm.cl",
    imagen: avatar,
  });
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    setShowModal(false); // Cierra el modal tras confirmar
  };

  const handleShowModal = (reserva) => {
    setReservaSeleccionada(reserva);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setReservaSeleccionada(null);
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
            <p>No has reservado ningún libro todavía.</p>
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
                <button onClick={() => handleShowModal(reserva)}>Cancelar Reserva</button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Cancelación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reservaSeleccionada && (
            <>
              <p>¿Estás seguro de que deseas cancelar la reserva de <strong>{reservaSeleccionada.nombre}</strong>?</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => handleCancel(reservaSeleccionada.id)}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UsuarioPage;
