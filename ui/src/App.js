// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import SubmitReactionTime from './components/SubmitReactionTime';
import GetReactionTimes from './components/GetReactionTimes';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  return (
    <Router>
      <div>
        <nav>
          <ul>
            {!token ? (
              <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/submit-reaction-time">Submit Reaction Time</Link></li>
                <li><Link to="/get-reaction-times">Get Reaction Times</Link></li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          {token && (
            <>
              <Route path="/submit-reaction-time" element={<SubmitReactionTime token={token} />} />
              <Route path="/get-reaction-times" element={<GetReactionTimes token={token} />} />
            </>
          )}
          <Route path="/" element={<h1>Welcome to F1 Reaction Timer</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;