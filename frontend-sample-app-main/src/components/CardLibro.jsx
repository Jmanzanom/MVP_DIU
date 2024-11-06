import React, {useState} from "react";
import '../stylesheets/index.scss'; // Importa el archivo SCSS con los styles
import { Button } from 'react-bootstrap';
import ReservarLibro from './ReservarLibro';

function CardLibro({ libro }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <Button variant="primary" type="submit" onClick={handleShow}>Reservar</Button>
      </div>
      <ReservarLibro show={show} handleClose={handleClose} libro= {libro}/>
    </>
    
  );
}

export default CardLibro;
