import React, { useState } from "react";
import '../stylesheets/index.scss';
import { Button } from 'react-bootstrap';
import ReservarLibro from './ReservarLibro';

function CardLibro({ libro }) {
  const [show, setShow] = useState(false);
  const [isReserved, setIsReserved] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleReserve = () => {
    setIsReserved(true); // Actualizamos el estado para reflejar que está reservado
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
          variant={isReserved ? "success" : "primary"} 
          onClick={handleShow} // Permite abrir el modal siempre
          style={{
            backgroundColor: isReserved ? '#28a745' : '',
            border: isReserved ? '1px solid #28a745' : '',
            color: 'white'
          }}
        >
          {isReserved ? "Reservado" : "Reservar"}
        </Button>
      </div>
      <ReservarLibro 
        show={show} 
        handleClose={handleClose} 
        libro={libro} 
        isReserved={isReserved} // Pasamos el estado de reserva
        onReserve={handleReserve} // Pasamos la función de reserva
      />
    </>
  );
}

export default CardLibro;


