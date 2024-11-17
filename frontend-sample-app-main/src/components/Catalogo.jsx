import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardLibro from "./CardLibro";
import infiltrado from "../assets/infiltrado.jpg";
import cielos from "../assets/cielos.jpg";
import iliada from "../assets/iliada.png";
import elantris from "../assets/elantris.jpg";
import brumas from "../assets/brumas.jpg";
import senorAnillos from "../assets/anillos.jpg";

function Catalogo({ reservas, onReserve }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  
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
        nombre: "Nacido de la bruma: Imperio final",
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

  // Obtener los parámetros de la URL (buscar término de búsqueda)
  const location = useLocation();

  useEffect(() => {
    // Extraer el término de búsqueda de la URL
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    if (search) {
      setSearchQuery(search);  // Guardar el término de búsqueda
      filterBooks(search);     // Filtrar los libros según la búsqueda
    } else {
      setSearchQuery('');
      setFilteredBooks([]);    // Si no hay búsqueda, mostrar todos los libros
    }
  }, [location]); // Se ejecuta cada vez que cambia la URL

  // Función para filtrar los libros según el nombre
  const filterBooks = (query) => {
    const allBooks = Object.values(categorias).flat(); // Unir todos los libros de todas las categorías
    const filtered = allBooks.filter(libro => 
      libro.nombre.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBooks(filtered);  // Guardar los libros filtrados en el estado
  };

  return (
    <div className="catalogo__container">
      {filteredBooks.length === 0 && searchQuery ? (
        <p>No se encontraron libros con el término "{searchQuery}".</p>
      ) : (
        Object.keys(categorias).map((categoria) => (
          <div key={categoria}>
            <h2>{categoria}</h2>
            <div className="catalogo__grid">
              {categorias[categoria].map((libro) => (
                filteredBooks.length === 0 || filteredBooks.some(filtered => filtered.id === libro.id) ? (
                  <CardLibro
                    key={libro.id}
                    libro={libro}
                    reservas={reservas}
                    onReserve={onReserve}
                  />
                ) : null
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Catalogo;
