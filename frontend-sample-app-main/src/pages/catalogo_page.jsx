import React from "react";
import Catalogo from "../components/Catalogo";
import '../stylesheets/index.scss'; // Importa estilos para la página

const CatalogoPage = () => {
  return (
    <div className="catalogo-page">
      <h1 className="catalogo-title">Catálogo de Libros</h1>
      <Catalogo />
    </div>
  );
};

export default CatalogoPage;
