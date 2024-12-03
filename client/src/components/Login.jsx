import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUser } from "./UserContext";
import "../styles/Login.css";

const Login = () => {
  const { user,logout, login, } = useUser();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [userType, setUserType] = useState('buyer');
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupSuccess, setSignupSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      // Send login request to your backend
      const response = await axios.post('https://printhubback.vercel.app/users/login', {
        email:loginEmail,
        password:loginPassword,
      });

      const userData = response.data;

      // Save session ID as a cookie
      Cookies.set('sessionId', userData._id, { expires: 7 }); // Expires in 7 days
      login(userData);

      // Set user data in local state
      console.log(userData)
     // setUserInfo(userData);
      login(userData)

      alert('Login successful!');
    } catch (err) {
      setLoginError('Login failed. Please check your email and password.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');
    setSignupSuccess('');

    try {
      // Create a new user
      const userResponse = await axios.post('https://printhubback.vercel.app/users', {
        name:signupName,
        email:signupEmail,
        password:signupPassword,
      });

      const userId = userResponse.data._id;

      if (userType === 'buyer' || userType === 'both') {
        await axios.post('https://printhubback.vercel.app/buyers', {
          userId,
        });
      }

      if (userType === 'seller' || userType === 'both') {
        await axios.post('https://printhubback.vercel.app/sellers', {
          userId,
        });
      }

      setSignupSuccess('Signup successful! You can now log in.');
    } 
    catch (err) {
      console.error('Signup error:', err.response ? err.response.data : err.message);
      setSignupError('Signup failed. Please try again.');
    }
  };


  const handleLogout = () => {
    // Remove the session cookie
    logout()
    //setUserInfo(null);
    alert('Logged out successfully!');
  };
  useEffect(()=>{
console.log(user)
  },[user])

  return (
    <div class="forms">
      <div>
        {user == null ? (
          <>
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
            <div>
              <input
                class="long"
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                class="long"
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {/* <Link to="/signup" class="signup">SignUp</Link> */}
          </>
        ) : (
          <div>
            <h2>Welcome, {user.name}!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div class="centerline">
        <hr></hr>
      </div>
      <div>
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {signupError && <p style={{ color: 'red' }}>{signupError}</p>}
        {signupSuccess && <p style={{ color: 'green' }}>{signupSuccess}</p>}

        <div>
          <input
            class="long"
            type="text"
            placeholder="Name"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            class="long"
            type="emailAddress"
            placeholder="Email Address"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            class="long"
            type="password"
            placeholder="Password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            required
          />
        </div>
        <div class="radio">
          <label>
            <input
              type="radio"
              value="buyer"
              checked={userType === 'buyer'}
              onChange={() => setUserType('buyer')}
            />
            Buyer
          </label>
          <label>
            <input
              type="radio"
              value="seller"
              checked={userType === 'seller'}
              onChange={() => setUserType('seller')}
            />
            Seller
          </label>
          <label>
            <input
              type="radio"
              value="both"
              checked={userType === 'both'}
              onChange={() => setUserType('both')}
            />
            Both
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {/* <Link to="/login">Back to Login</Link> */}
    </div>
  </div>

    
  );
};

export default Login;
