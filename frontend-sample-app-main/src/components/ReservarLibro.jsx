import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ReservarLibro = ({ show,handleClose,libro }) => {

    const today = new Date();
    let returnDate = new Date();
    returnDate.setDate(today.getDate() + 7);

    if (returnDate.getDay() === 6) {
        returnDate.setDate(returnDate.getDate() + 2); // Si es sabado, sumar 2 dias
    } else if (returnDate.getDay() === 0) {
        returnDate.setDate(returnDate.getDate() + 1); // Si es domingo, sumar 1 dia
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
                <p>Usted esta reservando {libro.nombre}?</p>
                <img
                    src={libro.imagen}
                    alt={libro.nombre}
                    className="card-libro__image"
                    style={{ width: 'auto', height: 'auto' }}
                />
                <p>Tiempo de prestamo:{loanPeriod} días</p>
                <p>Fecha de retiro: {today.toLocaleDateString()}</p>
                <p>Fecha de devolución: {returnDate.toLocaleDateString()}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Reservar
                </Button>
            </Modal.Footer>
        </Modal>
    );
    
};

export default ReservarLibro;