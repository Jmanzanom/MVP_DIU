import React from 'react';
import styled from 'styled-components';

// Contenedor principal de la hero
const HeroContainer = styled.section`
  width: 100%;
  height: 60vh;
  position: relative;
  overflow: hidden;
  background-color: #1C3144;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: auto;
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
  max-width: 800px;
  width: 100%;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;

  h1 {
    font-size: 3.2rem;
    margin: 0;
    color: #1C3144;
  }

  p {
    font-size: 1.4rem;
    margin-top: 20px;
    color: #4B5563;
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ExploreOpportunities = () => (
  <div>
    <h2>Explora Oportunidades</h2>
    <p>Descubre las diferentes opciones de ayudantías disponibles en cada departamento.</p>
    {/* Agrega los enlaces o componentes correspondientes */}
  </div>
);

const PostuleFacilmente = () => (
  <div>
    <h2>Postula Fácilmente</h2>
    <p>Proceso simplificado de postulación para ayudantías en todos los departamentos.</p>
    {/* Agrega el formulario o los componentes correspondientes */}
  </div>
);

const RealTimeTracking = () => (
  <div>
    <h2>Seguimiento en Tiempo Real</h2>
    <p>Mantente informado sobre el estado de tus postulaciones a ayudantías.</p>
    {/* Agrega los componentes o la funcionalidad de seguimiento */}
  </div>
);

const Homepage = () => {
  return (
    <HeroContainer>
      <HeroImage />
      <HeroText>
        <h1>Bienvenido a la Biblioteca</h1>
        <p>Explora recursos académicos, espacios de estudio y mucho más.</p>
      </HeroText>
      <ExploreOpportunities />
      <PostuleFacilmente />
      <RealTimeTracking />
    </HeroContainer>
  );
};

const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('https://repositorio.usm.cl/assets/dspace/images/banner.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default Homepage;