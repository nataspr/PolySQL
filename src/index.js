import React, { useEffect, useState } from 'react';
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

  const [state, setState] = useState(null);

  const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  // получение GET маршрута с сервера Express, который соответствует GET из server.js
  useEffect(() => {
    callBackendAPI()
        .then(res => setState(res.express))
        .catch(err => console.log(err));
  }, [])

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
