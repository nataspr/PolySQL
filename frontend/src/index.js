import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import Tasks from './views/tasks'
import ComingSoon from './views/coming-soon'
import Profile from './views/profile'
import Home from './views/home'
import NotFound from './views/not-found'
import Register from './views/register'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Tasks} exact path="/tasks" />
        <Route component={ComingSoon} exact path="/coming-soon" />
        <Route component={Profile} exact path="/profile" />
        <Route component={Register} exact path="/register" />
        <Route component={Home} exact path="/" />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
