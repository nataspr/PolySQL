import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import './style.css'
import Tasks from './views/tasks/tasks'
import ComingSoon from './views/comingSoon/coming-soon'
import Profile from './views/profile/profile'
import Home from './views/home/home'
import NotFound from './views/page404/not-found'
import Register from './views/registration/register'

const App = () => {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'))
