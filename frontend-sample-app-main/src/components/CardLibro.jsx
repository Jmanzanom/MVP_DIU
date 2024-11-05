import React from "react";
import '../stylesheets/index.scss'; // Importa el archivo SCSS con los styles

function CardLibro({ libro }) {
  return (
    <div className="card-libro">
      <img
        src={libro.imagen}
        alt={libro.nombre}
        className="card-libro__image"
      />
      <h3 className="card-libro__title">{libro.nombre}</h3>
      <p className="card-libro__author">{libro.autor}</p>
    </div>
  );
}

export default CardLibro;
