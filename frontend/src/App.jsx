import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home/Home';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import CustomerDashboard from './Pages/CustomerDashboard/CustomerDashboard';
import Login from './Pages/Login/Login';
import Service from './components/Service/Service';
import Register from './components/Register/Register';
import Contact from './components/Contact/Contact';
import AboutUs from './components/AboutUs/AboutUs';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <Router>
      
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isLoggedIn 
                ? (userRole === 'admin' ? <Navigate to="/admin-dashboard" /> : <Navigate to="/customer-dashboard" />)
                : <Login onLogin={handleLogin} />
            } 
          />
          <Route 
            path="/admin-dashboard" 
            element={
              isLoggedIn && userRole === 'admin' 
                ? <AdminDashboard onLogout={handleLogout} />
                : <Navigate to="/login" />
            } 
          />
          <Route 
            path="/customer-dashboard" 
            element={
              isLoggedIn && userRole === 'customer' 
                ? <CustomerDashboard />
                : <Navigate to="/login" />
            } 
          />
          <Route path="/services" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact/>} />
           <Route path="/about" element={<AboutUs/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
