import { useState } from 'react'
import Home from './components/Home';
import Recommendation from './components/Recommendation';
import Result from './components/Result';
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
          <Route path='/result' element={<Result />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
