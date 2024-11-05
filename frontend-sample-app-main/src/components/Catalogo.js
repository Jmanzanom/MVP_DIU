import React from "react";
import CardLibro from "./CardLibro";
import infiltrado from "../assets/infiltrado.jpg";
import cielos from "../assets/cielos.jpg";
import iliada from "../assets/iliada.png";
import elantris from "../assets/elantris.jpg";
import brumas from "../assets/brumas.jpg";
import senorAnillos from "../assets/anillos.jpg";
import '../stylesheets/Catalogo.css'; // Importa el archivo CSS para el catálogo

function Catalogo() {
  const categorias = {
    "Accion": [
      {
        id: 1,
        nombre: "Infiltrado",
        autor: "Adrian Aragorn",
        imagen: infiltrado
      },
      {
        id: 2,
        nombre: "La guerra de los cielos",
        autor: "Fernando Trujillo",
        imagen: cielos
      },
      {
        id: 3,
        nombre: "La Iliada",
        autor: "Homero",
        imagen: iliada
      }
    ],
    "Fantasia": [
      {
        id: 4,
        nombre: "Elantris",
        autor: "Brandon Sanderson",
        imagen: elantris
      },
      {
        id: 5,
        nombre: "Nacido de la bruma:Imperio final",
        autor: "Brandon Sanderson",
        imagen: brumas
      },
      {
        id: 6,
        nombre: "El señor de los anillos: el retorno del rey",
        autor: "J.R.R. Tolkien",
        imagen: senorAnillos
      }
    ]
  };

  return (
    <div className="catalog-container">
      {Object.keys(categorias).map((categoria) => (
        <div key={categoria}>
          <h2>{categoria}</h2>
          <div className="catalogo__grid">
            {categorias[categoria].map((libro) => (
              <CardLibro key={libro.id} libro={libro} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Catalogo;
