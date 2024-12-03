import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Cart from './components/Cart';
import Listings from './components/Listings';
import { UserProvider } from './components/UserContext';
import IndividualListing from './components/IndividualListing';

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
        <Route path = "/cart" element = {<Cart />}/>
        <Route path = "/listings" element = {<Listings />}/>
        <Route path = "/listings/:id" element = {<IndividualListing />}/>
        <Route path = "/profile" element = {<Profile />}/>
      </Routes>
    </Router>
    </UserProvider>
    </>
  );
}

export default App;
