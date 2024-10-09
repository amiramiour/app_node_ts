// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import SubmitReactionTime from './components/SubmitReactionTime';
import GetReactionTimes from './components/GetReactionTimes';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Supprimer le token du state et du localStorage
      setToken('');
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

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
                <li><button onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </nav>
        <Routes>
          {/* Si l'utilisateur est connecté, rediriger depuis /register et /login vers /submit-reaction-time */}
          <Route
            path="/register"
            element={!token ? <Register setToken={setToken} /> : <Navigate to="/submit-reaction-time" />}
          />
          <Route
            path="/login"
            element={!token ? <Login setToken={setToken} /> : <Navigate to="/submit-reaction-time" />}
          />
          <Route
            path="/submit-reaction-time"
            element={
              <PrivateRoute token={token}>
                <SubmitReactionTime token={token} />
              </PrivateRoute>
            }
          />
          <Route
            path="/get-reaction-times"
            element={
              <PrivateRoute token={token}>
                <GetReactionTimes token={token} />
              </PrivateRoute>
            }
          />
          {/* Redirection par défaut si l'utilisateur n'est pas authentifié */}
          <Route path="/" element={<Navigate to={token ? "/submit-reaction-time" : "/register"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
