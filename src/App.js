import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Repos from './pages/Repos'
import Repo from './pages/Repo'
import NotFound from './pages/NotFound'
import { getPath } from './globalSetting'

function App () {
  return (
    <div>
      <Routes>
        <Route exact path={getPath('/')} element={<Home />} />
        <Route path={getPath('/users/:username/repos')} element={<Repos />} />
        <Route
          path={getPath('/users/:username/repos/:repo')}
          element={<Repo />}
        />
        <Route path={getPath('*')} element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
