import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, username } = location.state || {};
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchAppointments(userId);
    }
  }, [userId]);

  const fetchAppointments = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/appointments/user/${userId}`);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

 
  return (
    <div className="customer-dashboard-body">
      <div className="customer-dashboard-left-panel">
        <h1>Customer Dashboard</h1>
        <div className="user-info">
          <p><strong>User ID:</strong> {userId}</p>
          <p><strong>Welcome,</strong> {username}</p>
        </div>
        <ul className="dashboard-links">
          <li><i className="bx bx-calendar-minus"></i> My Services</li>
          <li><i className="bx bx-book-open"></i> Give Review</li>
        </ul>
       
      </div>
      <div className="customer-dashboard-right-panel">
        <h2>My Appointments</h2>
        <div className="details-section">
          {appointments.length > 0 ? (
            appointments.map(appointment => (
              <div key={appointment.appointment_id} className="appointment-card">
                <p><strong>Appointment ID:</strong> {appointment.appointment_id}</p>
                <p><strong>Service ID:</strong> {appointment.service_id}</p>
                <p><strong>Date:</strong> {appointment.appointment_date}</p>
                <p><strong>Status:</strong> {appointment.status}</p>
              </div>
            ))
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
