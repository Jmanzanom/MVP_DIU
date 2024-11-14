import React from 'react';
import styled from 'styled-components';

// Contenedor principal de la hero
const HeroContainer = styled.section`
  width: 100%;
  height: 60vh; /* Ocupa 60% de la altura de la pantalla */
  position: relative;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  /* Asegura que la sección sea responsiva */
  @media (max-width: 768px) {
    height: auto; /* Permite que se ajuste en pantallas pequeñas */
  }
`;

// Contenedor del texto
const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;

  h1 {
    font-size: 2.8rem;
    margin: 0;
    color: #333;
  }

  p {
    font-size: 1.2rem;
    margin-top: 10px;
    color: #666;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// Contenedor de la imagen
const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('https://repositorio.usm.cl/assets/dspace/images/banner.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// Componente Homepage
const Homepage = () => {
  return (
    <HeroContainer>
      <HeroImage />
      <HeroText>
        <h1>Bienvenidos a la Biblioteca USM</h1>
        <p>Explora recursos académicos, espacios de estudio y mucho más para apoyar tu camino académico.</p>
      </HeroText>
    </HeroContainer>
  );
};

export default Homepage;