import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Contactus from './pages/contactus';
import Profile from './pages/Profile';
import Header from './components/common/Header';



const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (user) => {
    setLoggedInUser(user);
    navigate('/home');
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    navigate('/');
  };

  const shouldDisplayHeader = location.pathname !== '/' && location.pathname !== '/login';

  return (
    <Provider store={store}>
      <>
        {shouldDisplayHeader && (
          <Header loggedInUser={loggedInUser} onLogout={handleLogout} />
        )}
        <Routes>
          <Route
            path="/"
            element={<Signup onLogin={handleLogin} />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<Login onLogin={handleLogin} />}
          />
          <Route
            path="/contact"
            element={<Contactus />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
      </>
    </Provider>
  );
};

export default App;
