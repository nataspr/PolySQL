import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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
        <Routes>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'))
