import React from 'react'
import { createRoot } from 'react-dom/client';

import Layout from './components/layout'

import './stylesheets/index.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Cambiar el título de la pestaña
document.title = "Biblioteca USM";

document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById('root'));
root.render(<Layout />);
