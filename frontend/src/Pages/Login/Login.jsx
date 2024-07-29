import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import NavBar from '../../components/NavBar/NavBar';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { username, password });
      const { user } = response.data;

      if (user.role === role) {
        onLogin(user.role);
        localStorage.setItem('user', JSON.stringify(user));

        if (role === 'customer') {
          navigate('/customer-dashboard', { state: { userId: user.user_id, username: user.username } });
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        }
      } else {
        setError('Invalid role for the given username and password');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-body">
      <NavBar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder="Username" 
              autoComplete='off' 
              spellCheck="false"  // to prevent auto-fill suggestions in password fields
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Password" 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit">Login</button>
          <p className="register-link">
            Don't have an account? <button type="button" onClick={handleRegister} className='register-btn'>Register</button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
