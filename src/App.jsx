import { useState } from 'react'
import Home from './components/Home';
import Survey from './components/Survey';
import Recommendation from './components/Recommendation';
import { getTokenFromUrl, CheckToken } from './backend/Spotify';
import { Route, Routes, Router } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recommendation' element={<Recommendation />} />
          <Route path='/survey' element={<Survey />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
