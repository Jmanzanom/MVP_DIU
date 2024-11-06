import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ReservarLibro = ({ show, handleClose, libro, onReservar }) => {

    const today = new Date();
    let returnDate = new Date();
    returnDate.setDate(today.getDate() + 7);

    if (returnDate.getDay() === 6) {
        returnDate.setDate(returnDate.getDate() + 2); // Si es sábado, sumar 2 días
    } else if (returnDate.getDay() === 0) {
        returnDate.setDate(returnDate.getDate() + 1); // Si es domingo, sumar 1 día
    }

    const loanPeriod = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));

    return (
        <Modal 
            show={show} 
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Reservar libro
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Usted está reservando {libro.nombre}?</p>
                <img
                    src={libro.imagen}
                    alt={libro.nombre}
                    className="card-libro__image"
                    style={{ width: 'auto', height: 'auto' }}
                />
                <p>Tiempo de préstamo: {loanPeriod} días</p>
                <p>Fecha de retiro: {today.toLocaleDateString()}</p>
                <p>Fecha de devolución: {returnDate.toLocaleDateString()}</p>
                <p>Renovaciones disponibles: 1</p>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => { onReservar(); handleClose(); }}>
                    Reservar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ReservarLibro;
