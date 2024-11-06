import React from 'react'
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import Layout from './components/layout'

import './stylesheets/index.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Cambiar el título de la pestaña
document.title = "Biblioteca USM";

// Crear y agregar el elemento <link> para el favicon
const link = document.createElement('link');
link.rel = 'icon';
link.href = './assets/logo2.ico'; // Ajusta el nombre del archivo
link.type = 'image/x-icon';

// Asegúrate de que no haya otro favicon antes de agregarlo
const existingLink = document.querySelector("link[rel='icon']");
if (existingLink) {
  document.head.removeChild(existingLink);
}
document.head.appendChild(link);

document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById('root'));
root.render(<Layout />);
