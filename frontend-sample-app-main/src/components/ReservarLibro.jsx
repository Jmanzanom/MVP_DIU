import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ReservarLibro = ({ show, handleClose, libro, isReserved, onReserve }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const today = new Date();
  let returnDate = new Date();
  returnDate.setDate(today.getDate() + 7);

  if (returnDate.getDay() === 6) {
    returnDate.setDate(returnDate.getDate() + 2);
  } else if (returnDate.getDay() === 0) {
    returnDate.setDate(returnDate.getDate() + 1);
  }

  const loanPeriod = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));

  const handleConfirm = () => {
    onReserve();
    setIsConfirming(false);
    handleClose();
  };

  return (
    <Modal 
      show={show} 
      onHide={() => {
        setIsConfirming(false);
        handleClose();
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isReserved ? 'Detalles de Reserva' : 'Reservar Libro'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isReserved ? (
          <>
            <p><strong>{libro.nombre}</strong> ya está reservado.</p>
            <img
              src={libro.imagen}
              alt={libro.nombre}
              className="card-libro__image"
              style={{ width: 'auto', height: 'auto' }}
            />
            <p>Tiempo de préstamo: {loanPeriod} días</p>
            <p>Fecha de retiro: {today.toLocaleDateString()}</p>
            <p>Fecha de devolución: {returnDate.toLocaleDateString()}</p>
          </>
        ) : (
          <>
            {isConfirming ? (
              <>
                <p>¿Estás seguro de que deseas reservar <strong>{libro.nombre}</strong>?</p>
              </>
            ) : (
              <>
                <p>¿Desea reservar <strong>{libro.nombre}</strong>?</p>
                <img
                  src={libro.imagen}
                  alt={libro.nombre}
                  className="card-libro__image"
                  style={{ width: 'auto', height: 'auto' }}
                />
                <p>Tiempo de préstamo: {loanPeriod} días</p>
                <p>Fecha de retiro: {today.toLocaleDateString()}</p>
                <p>Fecha de devolución: {returnDate.toLocaleDateString()}</p>
              </>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isReserved ? (
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        ) : isConfirming ? (
          <>
            <Button variant="secondary" onClick={() => setIsConfirming(false)}>
              Cancelar
            </Button>
            <Button variant="success" onClick={handleConfirm}>
              Confirmar
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button 
              variant="primary"
              onClick={() => setIsConfirming(true)}
            >
              Reservar
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ReservarLibro;





