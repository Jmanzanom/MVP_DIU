import React from 'react'
import { createRoot } from 'react-dom/client';

import Layout from './components/layout'

import 'bootstrap/dist/css/bootstrap.min.css';

import './stylesheets/index.scss'

document.body.innerHTML = '<div id="root"></div>';
const root = createRoot(document.getElementById('root'));
root.render(<Layout />);