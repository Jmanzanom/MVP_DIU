import React from "react";

const PerfilUsuario = ({ usuario }) => {
  return (
    <div className="perfil-usuario">
      <img src={usuario.imagen} alt={`${usuario.nombre} Avatar`} />
      <h3>{usuario.nombre}</h3>
      <p>Correo: {usuario.correo}</p>
    </div>
  );
};

export default PerfilUsuario;
