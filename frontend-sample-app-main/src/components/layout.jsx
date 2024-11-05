import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from '../pages/home_page'
import LightbulbPage from '../pages/lightbulb_page'
import ReservaPage from '../pages/reserva_page'

import NavBar from '../components/nav_bar'

const styles = `
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.layout__main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.layout__page {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Si necesitas mantener el título, puedes ponerlo como subtítulo debajo de la navbar */
.layout__subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1e3a8a;
  font-weight: bold;
}

@media (max-width: 768px) {
  .layout__main {
    padding: 1rem;
  }
  
  .layout__page {
    padding: 1rem;
  }
}
`

const Layout = () => {
  return (
    <BrowserRouter>
      <div className='layout'>
        <style>{styles}</style>
        <NavBar />
        <main className="layout__main">
          <h2 className='layout__subtitle'>Interfaz energética</h2>
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
