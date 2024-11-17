import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CardLibro from "./CardLibro";

function Catalogo({ reservas, onReserve }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categorias, setCategorias] = useState({
    "Accion": [
      { id: 1, nombre: "El código Da Vinci", autor: "Dan Brown" },
      { id: 2, nombre: "La guerra de los cielos", autor: "Fernando Trujillo" },
      { id: 3, nombre: "La Iliada", autor: "Homero" }
    ],
    "Fantasia": [
      { id: 4, nombre: "Elantris", autor: "Brandon Sanderson" },
      { id: 5, nombre: "El nombre del viento", autor: "Patrick Rothfuss" },
      { id: 6, nombre: "El señor de los anillos: el retorno del rey", autor: "J.R.R. Tolkien" }
    ],
    "Ciencia Ficcion": [
      { id: 7, nombre: "Dune", autor: "Frank Herbert" },
      { id: 8, nombre: "Fundación", autor: "Isaac Asimov" },
      { id: 9, nombre: "El fin de la infancia" , autor: "Arthur C. Clarke" }
    ],
    "Terror": [
      { id: 10, nombre: "El resplandor", autor: "Stephen King" },
      { id: 11, nombre: "Frankenstein", autor: "Mary Shelley" },
      { id: 12, nombre: "La llamada de Cthulhu", autor: "H.P. Lovecraft" }
    ],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 2;

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const search = queryParams.get('search');
    if (search) {
      setSearchQuery(search);
      filterBooks(search);
    } else {
      setSearchQuery('');
      setFilteredBooks([]);
    }
  }, [location]);

  useEffect(() => {
    fetchBookImages(); // Buscar imágenes al cargar la página
  }, []);

  const fetchBookImages = async () => {
    const updatedCategorias = { ...categorias };
  
    const requests = [];
    for (const categoria in categorias) {
      for (const libro of categorias[categoria]) {
        requests.push(
          fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(libro.nombre)}`)
            .then(response => response.json())
            .then(data => {
              if (data.items && data.items.length > 0) {
                const bookInfo = data.items[0].volumeInfo;
                libro.imagen = bookInfo.imageLinks?.thumbnail || "";
                console.log(`${libro.nombre}: ${libro.imagen}`); // Verifica las URLs
              } else {
                libro.imagen = "";
              }
            })
            .catch(error => {
              console.error(`Error al buscar el libro "${libro.nombre}":`, error);
              libro.imagen = "";
            })
        );
      }
    }
  
    await Promise.all(requests);
    setCategorias(updatedCategorias);
  };
  
  const filterBooks = (query) => {
    const normalizeString = (str) => {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };
  
    const normalizedQuery = normalizeString(query);
    const allBooks = Object.entries(categorias).flatMap(([categoria, libros]) =>
      libros.map(libro => ({ ...libro, categoria }))
    );
    const filtered = allBooks.filter(libro =>
      normalizeString(libro.nombre).includes(normalizedQuery) ||
      normalizeString(libro.autor).includes(normalizedQuery) ||
      normalizeString(libro.categoria).includes(normalizedQuery)
    );
    setFilteredBooks(filtered);
  };

  const totalPages = Math.ceil(Object.keys(categorias).length / categoriesPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const displayedCategories = Object.keys(categorias).slice(
    (currentPage - 1) * categoriesPerPage,
    currentPage * categoriesPerPage
  );

  return (
    <div className="catalogo__container">
      {searchQuery ? (
        filteredBooks.length === 0 ? (
          <p>No se encontraron libros con el término "{searchQuery}".</p>
        ) : (
          <div className="catalogo__grid">
            {filteredBooks.map((libro) => (
              <CardLibro
                key={libro.id}
                libro={libro}
                reservas={reservas}
                onReserve={onReserve}
              />
            ))}
          </div>
        )
      ) : (
        displayedCategories.map((categoria) => (
          <div key={categoria}>
            <h2>{categoria}</h2>
            <div className="catalogo__grid">
              {categorias[categoria].map((libro) => (
                <CardLibro
                  key={libro.id}
                  libro={libro}
                  reservas={reservas}
                  onReserve={onReserve}
                />
              ))}
            </div>
          </div>
        ))
      )}
      {!searchQuery && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Catalogo;
