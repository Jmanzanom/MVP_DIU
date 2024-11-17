import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';  // Importa useNavigate
import logoImg from '../assets/logo.png';
import '../stylesheets/nav-bar/index.scss';
import { User } from 'lucide-react';

const SearchIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");  // Estado para la búsqueda
  const navigate = useNavigate();  // Hook para navegar entre rutas

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Redirigir al catálogo con el término de búsqueda como parámetro de consulta
      navigate(`/catalogo?search=${searchQuery}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();  // Llama a handleSearch solo si se presiona Enter
    }
  };

  const navLinkClass = ({ isActive }) => {
    const classes = ['nav-bar__link'];
    if (isActive) classes.push('nav-bar__link--active');
    return classes.join(' ');
  };

  return (
    <nav className="nav-bar">
      {/* Logo y Título */}
      <NavLink to="/" className="nav-bar__brand">
        <img src={logoImg} alt="Logo Biblioteca" className="nav-bar__logo" />
        <div className="nav-bar__title">
          <span>Biblioteca </span>
          <small>USM</small>
        </div>
      </NavLink>

      {/* Barra de búsqueda */}
      <div className="nav-bar__search">
        <input
          type="text"
          placeholder="Buscar..."
          className="nav-bar__search-input"
          value={searchQuery}  // Vincula el valor del input con el estado
          onChange={(e) => setSearchQuery(e.target.value)}  // Actualiza el estado con el texto ingresado
          onKeyDown={handleKeyDown}  // Captura la tecla presionada
        />
        <span 
          className="nav-bar__search-icon"
          onClick={handleSearch}  // Llama a handleSearch al hacer clic
        >
          <SearchIcon />
        </span>
      </div>

      {/* Botón Hamburguesa */}
      <button 
        className="nav-bar__toggle" 
        onClick={toggleMenu}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      {/* Enlaces de navegación */}
      <div className={`nav-bar__links ${isMenuOpen ? 'nav-bar__links--open' : ''}`}>
        <NavLink className={navLinkClass} to="/">
          Inicio
        </NavLink>
        <NavLink className={navLinkClass} to="/catalogo">
          Catálogo
        </NavLink>
        <NavLink className={navLinkClass} to="/reserva">
          Reserva Salas
        </NavLink>
        <NavLink className={navLinkClass} to="/informacion">
          Información
        </NavLink>
        <NavLink className={navLinkClass} to="/usuario">
          <User size={18} />
          Mi sesion
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
