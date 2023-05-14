import { useState } from 'react'
import Home from './components/Home';
import Recommendation from './components/Recommendation';
import { Link } from "react-router-dom"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={ <Home/> }/>
          <Route path='/recommendation' element={<Recommendation />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
