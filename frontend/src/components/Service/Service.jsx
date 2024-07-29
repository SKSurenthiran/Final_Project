import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Service.css';

function Service() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }

    fetchServices();
  }, []);

  const handleBookAppointment = (service) => {
    if (!user) {
      alert('Please log in to book an appointment');
      return;
    }
    setSelectedService(service);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/appointments/create', {
        user_id: user.user_id,
        service_id: selectedService.service_id,
        appointment_date: appointmentDate,
      });
      console.log('Appointment booked:', response.data);
      // Reset form
      setSelectedService(null);
      setAppointmentDate('');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div className="services-page">
      <div className="services-container">
        {services.map(service => (
          <div key={service.service_id} className="service-card">
            <img src={`http://localhost:3000${service.image_url}`} alt={service.service_name} className="service-image" />
            <h3>{service.service_name}</h3>
            <p>{service.description}</p>
            <p className="service-price">${service.price}</p>
            <button className="book-appointment-button" onClick={() => handleBookAppointment(service)}>Book Appointment</button>
          </div>
        ))}
      </div>

      {selectedService && (
        <div className="appointment-card">
          <h2>Book Appointment for {selectedService.service_name}</h2>
          <img src={`http://localhost:3000${selectedService.image_url}`} alt={selectedService.service_name} className="appointment-service-image" />
          <p>{selectedService.description}</p>
          <form onSubmit={handleSubmit}>
            <label>
              Appointment Date:
              <input
                type="datetime-local"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </label>
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setSelectedService(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Service;
