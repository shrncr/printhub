import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUser } from "./UserContext";

const Login = () => {
  const { user,logout, login, } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Send login request to your backend
      const response = await axios.post('http://localhost:8082/users/login', {
        email,
        password,
      });

      const userData = response.data;

      // Save session ID as a cookie
      Cookies.set('sessionId', userData._id, { expires: 7 }); // Expires in 7 days

      // Set user data in local state
      console.log(userData)
      setUserInfo(userData);
      login(userData)

      alert('Login successful!');
    } catch (err) {
      setError('Login failed. Please check your email and password.');
    }
  };

  const handleLogout = () => {
    // Remove the session cookie
    logout()
    setUserInfo(null);
    alert('Logged out successfully!');
  };
  useEffect(()=>{
console.log(user)
  },[user])
  return (
    <div>
      {user == null ? (
        <>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">SignUp</Link>
        </>
      ) : (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Login;
