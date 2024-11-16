import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home_page'
import ReservaPage from '../pages/reserva_page'
import CatalogoPage from '../pages/catalogo_page'
import InfoPage from '../pages/info_page'
import UsuarioPage from '../pages/usuario_page'

import NavBar from './nav_bar'
import Footer from './footer'

import styles from '../stylesheets/index.scss'



const Layout = () => {
  return (
    <BrowserRouter>
      <div className='layout'>
        <style>{styles}</style>
        <NavBar />
        <main className="layout__main">
          <h2 className='layout__subtitle'>Biblioteca USM</h2>
          <section className='layout__page'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/reserva' element={<ReservaPage />} />
              <Route path='/catalogo' element={<CatalogoPage />} />
              <Route path='/informacion' element={<InfoPage />} />
              <Route path='/usuario' element={< UsuarioPage/>} />
            </Routes>
          </section>
        </main>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default Layout
