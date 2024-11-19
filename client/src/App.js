import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import NavBar from './components/NavBar';
import { UserProvider } from './components/UserContext';
function App() {
  return (
    <>
    <UserProvider>
    <Router>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
    </UserProvider>
    </>
  );
}

export default App;
