import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import ReservarLibro from './ReservarLibro';
import '../stylesheets/catalogo_page/index.scss';

function CardLibro({ libro, reservas, onReserve }) {
  const [show, setShow] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  useEffect(() => {
    // Verificar si el libro ya está reservado
    const isBookReserved = reservas.some(reserva => reserva.id === libro.id);
    setIsReserved(isBookReserved);
  }, [libro.id, reservas]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReserve = () => {
    // Reservar el libro
    onReserve(libro);
  };

  return (
    <>
      <div className="card-libro">
        {libro.imagen && <img
          src={libro.imagen}
          alt={libro.nombre}
          className="card-libro__image"
        />}
        <h3 className="card-libro__title">{libro.nombre}</h3>
        <p className="card-libro__author">{libro.autor}</p>
        <Button 
          variant={isReserved ? "success" : "primary"} 
          onClick={handleShow}
          style={{
            backgroundColor: isReserved ? '#28a745' : '',
            border: isReserved ? '1px solid #28a745' : '',
            color: 'white'
          }}
          disabled={isReserved} // Deshabilitar si está reservado
        >
          {isReserved ? "Reservado" : "Reservar"}
        </Button>
      </div>
      <ReservarLibro 
        show={show} 
        handleClose={handleClose} 
        libro={libro} 
        isReserved={isReserved}
        onReserve={handleReserve}
      />
    </>
  );
}

export default CardLibro;
