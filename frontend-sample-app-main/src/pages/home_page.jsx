import React from 'react';
import Stack from 'react-bootstrap/Stack';
import '../stylesheets/home_page/index.scss';

const Homepage = () => {
  return (
    <Stack gap={2}>
      <section className="HeroContainer">
        <div className="HeroImage" />
        <div className="HeroText">
          <h1>Bienvenidos a la Biblioteca USM</h1>
          <p>Explora recursos académicos, espacios de estudio y mucho más para apoyar tu camino académico.</p>
        </div>
      </section>

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
    </Stack>
  );
};

export default Homepage;
