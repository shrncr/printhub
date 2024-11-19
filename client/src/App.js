import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Listings from './components/Listings';
function App() {
  return (
    <>
    
    <Router>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path = "/cart" element = {<Cart />}/>
        <Route path = "/listings" element = {<Listings />}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
