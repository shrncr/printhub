import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useUser } from "./UserContext";

const Signup = () => {
  const { user } = useUser();

  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('buyer'); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Create a new user
      const userResponse = await axios.post('https://printhubback.vercel.app/users', {
        name,
        emailAddress,
        password,
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

      setSuccess('Signup successful! You can now log in.');
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
     <div>
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="emailAddress"
            placeholder="Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
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
      <Link to="/login">Back to Login</Link>
    </div>
  );
};

export default Signup;
