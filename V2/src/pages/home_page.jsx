import React from 'react';

export const Homepage = () => {
  return (
    <div className='library-homepage'>
      <h1>Bienvenidos a la Biblioteca USM</h1>
      <p>
        La biblioteca de la Universidad Técnica Federico Santa María (USM) ofrece
        una amplia variedad de servicios para la comunidad estudiantil. Desde 
        recursos académicos hasta espacios de estudio, estamos aquí para ayudarte 
        a alcanzar tus metas académicas.
      </p>

      <section className="services">
        <div className="service">
          <h2>Reserva de Salas de Estudio</h2>
          <p>
            Reserva una sala de estudio para realizar trabajos en grupo o estudiar 
            en un ambiente tranquilo. Nuestras salas están equipadas con recursos 
            básicos para que puedas concentrarte en tus estudios.
          </p>
        </div>

        <div className="service">
          <h2>Préstamo de Libros</h2>
          <p>
            Consulta nuestra colección de libros académicos y literarios. 
            Puedes pedir prestado cualquier libro disponible y consultar 
            recomendaciones de lecturas actuales para tu área de estudio.
          </p>
        </div>
      </section>

      <footer className="library-footer">
        <p>
          Si tienes alguna pregunta, no dudes en contactarnos en el mostrador 
          de la biblioteca o por medio de nuestro sitio web.
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
