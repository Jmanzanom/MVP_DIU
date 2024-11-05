import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookCatalog = () => {
  // Datos de ejemplo - En un caso real, esto vendría de una API o props
  const categories = [
    {
      name: "Acción",
      books: [
        {
          id: 1,
          title: "Infiltrado",
          author: "Adrián Aragón y Miguel Aragón",
          image: "/api/placeholder/200/300"
        },
        {
          id: 2,
          title: "La guerra de los cielos 1",
          author: "Fernando Trujillo y Cesar Garcia",
          image: "/api/placeholder/200/300"
        },
        {
          id: 3,
          title: "La Iliada",
          author: "Homero",
          image: "/api/placeholder/200/300"
        },
      ]
    },
    {
      name: "Fantasía",
      books: [
        // Aquí irían más libros de fantasía
      ]
    }
  ];

  // Estado para manejar el scroll horizontal de cada categoría
  const [scrollPositions, setScrollPositions] = useState({});

  const scroll = (categoryIndex, direction) => {
    const container = document.getElementById(`category-${categoryIndex}`);
    if (container) {
      const scrollAmount = 300; // Ajusta este valor según necesites
      const newScrollLeft = container.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-12 text-gray-900 drop-shadow-md">
        Catálogo
      </h1>

      {/* Categories */}
      {categories.map((category, categoryIndex) => (
        <section key={categoryIndex} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            {category.name}
          </h2>
          
          <div className="relative">
            <div 
              id={`category-${categoryIndex}`}
              className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide"
              style={{ scrollBehavior: 'smooth' }}
            >
              {category.books.map((book) => (
                <div
                  key={book.id}
                  className="flex-none w-48 bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                >
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {book.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation arrows */}
            {category.books.length > 4 && (
              <>
                <button 
                  onClick={() => scroll(categoryIndex, 'left')}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => scroll(categoryIndex, 'right')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </section>
      ))}
    </main>
  );
};

export default BookCatalog;