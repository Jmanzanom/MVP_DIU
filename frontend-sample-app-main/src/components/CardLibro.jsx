import React, { useState } from "react";
import '../stylesheets/index.scss'; // Importa el archivo SCSS con los styles
import { Button } from 'react-bootstrap';
import ReservarLibro from './ReservarLibro';

function CardLibro({ libro }) {
  const [show, setShow] = useState(false);
  const [reservado, setReservado] = useState(false); // Estado para manejar la reserva
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReservar = () => {
    setReservado(true); // Cambia el estado a reservado
    handleClose(); // Cierra el modal
  };

  return (
    <>
      <div className="card-libro">
        <img
          src={libro.imagen}
          alt={libro.nombre}
          className="card-libro__image"
        />
        <h3 className="card-libro__title">{libro.nombre}</h3>
        <p className="card-libro__author">{libro.autor}</p>
        <Button 
          variant={reservado ? "success" : "primary"} // Cambia el color del botón
          type="submit" 
          onClick={handleShow}
          disabled={reservado} // Desactiva el botón si ya está reservado
        >
          {reservado ? "Reservado" : "Reservar"}
        </Button>
      </div>
      <ReservarLibro 
        show={show} 
        handleClose={handleClose} 
        libro={libro} 
        onReservar={handleReservar} // Pasa la función de reserva al modal
      />
    </>
  );
}

export default CardLibro;

