import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Repos from './pages/Repos'
import Repo from './pages/Repo'
import NotFound from './pages/NotFound'

function App () {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/users/:username/:repo" element={<Repo />} />
        <Route path="/users/:username/repos" element={<Repos />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
