import React from 'react'
import { Routes as Router, Route } from 'react-router-dom'
import setRoutes from './setting'

import Home from '../Pages/Home'
import NotFound from '../Pages/NotFound'
import Repos from '../Pages/Repos'
import ReposList from '../Pages/ReposList'

const Routes = () => {
  return (
    <Router>
      <Route exact path={setRoutes('/')} element={<Home />} />
      <Route
        path={setRoutes('/users/:username/repos')}
        element={<ReposList />}
      />
      <Route
        path={setRoutes('/users/:username/repos/:repo')}
        element={<Repos />}
      />
      <Route path={setRoutes('*')} element={<NotFound />} />
    </Router>
  )
}

export default Routes
