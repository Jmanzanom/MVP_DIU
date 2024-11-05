import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home_page'
import LightbulbPage from '../pages/lightbulb_page'
import ReservaPage from '../pages/reserva_page'

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
          <div className='layout__page'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/lightbulb' element={<LightbulbPage />} />
              <Route path='/reserva' element={<ReservaPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default Layout
