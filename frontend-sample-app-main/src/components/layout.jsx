import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home_page'
import ReservaPage from '../pages/reserva_page'
import CatalogoPage from '../pages/catalogo_page'
import InfoPage from '../pages/info_page'

import NavBar from '../components/nav_bar'
import styles from '../stylesheets/layout/index.scss'


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
            </Routes>
          </section>
        </main>
        <footer>
          <p>© 2024 Biblioteca USM</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default Layout
