import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import '../stylesheets/nav-bar/index.scss';

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
        />
        <span 
          className="nav-bar__search-icon"
          onClick={() => window.location.href = '/catalogo'}
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
          Reserva
        </NavLink>
        <NavLink className={navLinkClass} to="/informacion">
          Información
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
